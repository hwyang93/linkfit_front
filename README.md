# SETTING

## 기본 안내 
[리액트 네이티브 공식문서](https://reactnative.dev/)

[리액트 네이티브 네비게이션 공식문서](https://reactnavigation.org/)

[타입스크립트 공식문서](https://typescript-kr.github.io/)

[jdk11 다운로드](https://www.oracle.com/kr/java/technologies/javase/jdk11-archive-downloads.html)

[안드로이드 스튜디오 다운로드](https://developer.android.com/studio)

## 윈도우 개발 환경 설정
- Chocolatey 설치
```shell
cmd 관리자 모드에서 
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"TJFC
```
- 노드 설치 
```shell
choco install -y nodejs.install
node -v
```
- 파이썬 설치
```shell
choco install -y python2
python --version
재부팅 필요
```
- React Native CLI 설치
```shell
npm install -g react-native-cli
react-native -v // 버전 확인
``` 
- 안드로이드 스튜디오 SDK 매니저 설정
```shell
configure - SDK Manager 
우측 아래부분 Show Package Details 클릭 후
- Android SDK Platform 29
- Intel x86 Atom System Image
- Google APIs Intel x86 Atom System Image
- Google APIs Intel x86 Atom_64 System Image
위의 4항목 선택 해서 설치 
```
- 안드로이드 환경 변수
 ```shell
내PC 우클릭 - 속성 - 고급 시스템 설정 - 환경 변수 클릭 
변수 이름 : ANDROID_HOME
변수 값 : C:\Users\sm841\AppData\Local\Android\Sdk // 내 파일 위치 

Path 선택 후 편집 
C:\Users\sm841\AppData\Local\Android\Sdk\PLATFORM-TOOLS 하단에 추가 
```

## 맥 개발 환경 설
- HomeBrew 설치

[Homebrew 사이트](https://brew.sh/)
 ```shell
터미널에서
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew --version
```
- rbenv 설치
 ```shell
터미널에서 
brew install rbenv
rbenv install 2.7.5

2.7.5버전의 ruby를 기본 버전으로 설정
rbenv global 2.7.5
rbenv rehash

Ruby 패키지 관리자 번들러 설치 
gem install bundler
```
- Nodejs 설치
 ```shell
brew install node
```
- Watchman 설치
 ```shell
brew install watchman
```
- React Native CLI 설치
 ```shell
npm install -g react-native-cli
```
- Xcode 설치

[Xcode 다운로드 링크](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
 ```shell
Xcode 설치가 완료되면, Command Line Tools를 설정할 필요가 있습니다. 
Xcode를 실행하고 상단 메뉴에서 Xcode > Settings... > Locations로 이동하여 아래와 같이 
Command Line Tools 항목이 잘 설정되었는지 확인합니다.

Xcode 14.2(14c18) // 내 경우
```
- Cocoapods 설치
 ```shell
sudo gem install cocoapods

pod --version
```
- JDK 설치
 ```shell
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8

javac -version
```
- 안드로이드 스튜디오 설치 

[안드로이드 스튜디오](https://developer.android.com/studio)
- JDK 설치
 ```shell
configure - SDK Manager 
우측 아래부분 Show Package Details 클릭 후
- Android SDK Platform 29
- Intel x86 Atom System Image
- Google APIs Intel x86 Atom System Image
- Google APIs Intel x86 Atom_64 System Image
위의 4항목 선택 해서 설치 
```

- 안드로이드 환경 변수 설정
 ```shell
 ~/.bash_profile 파일 또는 ~/.zshrc 파일을 열고 아래와 같이 수정

# export ANDROID_HOME=$HOME/Library/Android/sdk
export ANDROID_HOME=자신의 안드로이드SDK 위치/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

만약 .bash_profile을 사용하시는 경우 아래에 명령어를 실행

source ~/.bash_profile
# or
source ~/.zshrc

위에 코드에서 자신의 안드로이드 SDK 위치를 자신의 환경에 맞춰 변경해 줍니다. 
자신의 안드로이드 SDK 위치가 어디인지 모르는 경우, 안드로이드 스튜디오 SDK 설정 화면에서 확인 가능.
```


## 프로젝트 환경 
- node 16.13.1
- ruby 2.7.5
- pod 1.11.3
- react-native 9.3.2
- jdk11


## 프로젝트 실행 
```shell
npm run ios
npm run android
```

## API 함수명 정의 
```shell
GET -> fetch....
POST -> create....
PATCH, PUT -> update....
DELETE -> delete....
```
