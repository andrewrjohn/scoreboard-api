pipeline {
  agent any
  stages {
    stage('pull from github') {
      steps {
        git(branch: 'release', url: 'https://github.com/andrewrjohn/scoreboard-api')
        sh 'echo \'test\''
      }
    }

  }
}