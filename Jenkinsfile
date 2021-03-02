pipeline {
  agent {
    docker {
      image 'node:lts-alpine3.12'
    }

  }
  stages {
    stage('do the stuff') {
      steps {
        sh 'npm install'
        sh 'npm run build'
        sh 'npm start'
      }
    }

  }
  environment {
    HOME = '.'
  }
}