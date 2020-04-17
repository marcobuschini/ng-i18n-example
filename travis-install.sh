#!/bin/sh

echo "Installing NPM packages"
npm install
echo "Cloning library repository"
git clone https://github.com/marcobuschini/ng-i18n.git
echo "Building library"
(cd ng-i18n; npm install; ng build)
echo "Removing old library"
rm node_modules/ng-i18n
echo "Installing new library"
cp -R ng-i18n/dist/ng-i18n node_modules
echo "Removing sources"
rm -rf ng-i18n
echo "Done"
sudo chown -R $USER node_modules/ng-i18n
