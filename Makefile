

rpm:
	rm -rf BUILD BUILDROOT RPMS SOURCES SRPMS
	mkdir -p BUILD BUILDROOT RPMS SOURCES SRPMS
	scl enable rh-python36 bash && rpmbuild --define '_topdir '`pwd` --define "release_type final" -bb SPEC/equb.spec