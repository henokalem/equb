

rpm:
	rm -rf BUILD BUILDROOT RPMS SOURCES SRPMS
	mkdir -p BUILD BUILDROOT RPMS SOURCES SRPMS
	rpmbuild --define '_topdir '`pwd` --define "release_type final" --b SPEC/equb.spec