#Modifed for continuous build, expects `svnvrevision` to be defined by the builder

# =============================
# Definitions
# ==============================
%define project equb
%define base_name /home/alemaye3/equb/SOURCES/equb
%define short_name equb
%define current_directory %(echo $PWD)
%define release_type snapshot
%define release 1.0.0
%define version dev.0
%define python_version python3.6
%define summary Equb community saving
%define root .

# =========================================
# Define Directories
# =========================================
%define http_conf_location /etc/httpd/conf.d
%define wsgi_conf_location /opt/equb/wsgi/
%define log_location /opt/equb/logs/
%define static_files /opt/equb/static/%{short_name}/
%define virtualenvs_location /opt/equb/envs/
%define template_location /opt/equb/templates/%{short_name}/  ##Make sure this path is correct
%define fixtures_location /opt/equb/fixtures/%{short_name}/   ##Make sure this path is correct
%define config_location /etc/conf.d/

# =====================================
# Package Metadata
# =====================================
Name: %{project}
Summary: %{summary}
Version: %{version}
Release: %{release}
Source0: %{base_name}-%{version}
License: Commercial
Group: Henok Alem
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-buildroot
Prefix: %{_prefix}
BuildArch: x86_64
Requires: python, httpd, mod_wsgi
Provides: equb
Vendor: Henok Alem
AutoReqProv: no


# ==========================================
%description
# ==========================================
%{summary}

%global __python %{__python3}

# ==========================================
%prep
# ==========================================
rm -rf %{SOURCE0}
git clone %{current_directory} %{SOURCE0}

# =======================================
%build
# =======================================
# Create a virtualenv
# Because we need to move virtualenv with virtualenv-tools,
# specifying python with -p doesn't work
virtualenv --no-site-packages %{short_name}

# =======================================
# Install runtime dependencies
# =======================================
%{short_name}/bin/pip install -U pip setuptools
%{short_name}/bin/pip install --no-binary :all: -r %{SOURCE0}/backend/requirements.txt --no-cache-dir --pre

# =========================================
# Install the package itself
# =========================================
/home/alemaye3/equb/BUILD/equb/bin/pip install %{SOURCE0}

# ========================================
%install
# =======================================
mkdir -p %{buildroot}%{http_conf_location}
mkdir -p %{buildroot}%{wsgi_conf_location}
mkdir -p %{buildroot}%{virtualenvs_location}
mkdir -p %{buildroot}%{static_files}
mkdir -p %{buildroot}%{log_location}
mkdir -p %{buildroot}%{config_location}

# ========================================
# Copy over the virtualenv
cp -R %{short_name} %{buildroot}%{virtualenvs_location}

# ========================================
# How to relocate virtualenv
/home/alemaye3/virtualenv-tools-env/bin/virtualenv-tools --update-path /home/alemaye3/equb/BUILD/equb %{buildroot}%{virtualenvs_location}%{short_name}

# =======================================
# Copy HTTPD conf, WSGI, and Static Files
# ======================================
cp %{SOURCE0}/etc/%{short_name}.conf %{buildroot}%{http_conf_location}
cp %{SOURCE0}/etc/%{short_name}.wsgi %{buildroot}%{wsgi_conf_location}

# move environment config file
cp %{SOURCE0}/etc/%{short_name}-environment.conf %{buildroot}%{config_location}

# ========================================
# Run Angular
# =======================================
mkdir %{SOURCE0}/webapp/dist
cd %{SOURCE0}/webapp && npm install
cd %{SOURCE0}/webapp && node_modules/.bin/ng build --output-path ../dist

# =========================================
%post
# =========================================
%{virtualenvs_location}%{short_name}/bin/django-admin.py migrate --settings=backend.settings

# =========================================
chown -R apache.apache %{log_location}
chown -R apache.apache %{static_files}
chown -R apache.apache %{http_conf_location}
chown -R apache.apache %{wsgi_conf_location}

# ==========================================
%clean
# =========================================
rm -rf %{_sourcedir}/*
rm -rf %{_builddir}/*
rm -rf %{buildroot}/*
rm -rf %{_srcrpmdir}/*

# ===========================================
%files
# ==========================================
# set default attr for all files here to be root, root
%defattr(-,root,root)
%attr(-,apache,apache) %{log_location}
%attr(-,apache,apache) %{static_files}
%attr(-,apache,apache) %{wsgi_conf_location}
%attr(-,apache,apache) %{virtualenvs_location}
%attr(-,apache,apache) %{http_conf_location}/%{short_name}.conf
%config %{http_conf_location}/%{short_name}.conf

# make sure that the environment config is not replaced
%config(noreplace) %{config_location}%{short_name}-environment.conf
