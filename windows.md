# Using Windows as Developing Machine

* Be sure WSL2 is installed and used on your machine
<https://docs.microsoft.com/en-us/windows/wsl/install-win10>

if you run the command:
```
wsl.exe --list --verbose
```
there should be something like 

* Name: Ubuntu - State: Running - Version: 2

# checking and installing the nvm and node.js

On the ubuntu wsl2 system you need node.js and npm to run the scripts later

```
nvm version # v12.22.1
npm version # something like
{
  npm: '7.15.1',
  node: '16.3.0',
  v8: '9.0.257.25-node.16',
  uv: '1.41.0',
  zlib: '1.2.11',
  brotli: '1.0.9',
  ares: '1.17.1',
  modules: '93',
  nghttp2: '1.42.0',
  napi: '8',
  llhttp: '6.0.2',
  openssl: '1.1.1k+quic',
  cldr: '39.0',
  icu: '69.1',
  tz: '2021a',
  unicode: '13.0',
  ngtcp2: '0.1.0-DEV',
  nghttp3: '0.1.0-DEV'
}
```
so in this case node is 12.22.1 and npm is version 6.14

To install nvm you can use this repo <https://github.com/nvm-sh/nvm>

After nvm is installed, you should add it to your path and install node on the system

# running in diconium network wit DPA and VPN enabled

Put the diconium certificate in the root chain, or bypass the ssl check

Bypassing (risky!)
```
npm config set strict-ssl false --global
```
Setting a certificate file
```
npm config set cafile /path/to/your/cert.pem --global
```

now you can run the initial_setup.sh script to install everything



