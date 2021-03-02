pipeline {
  agent {
    docker {
      image 'node:6-alpine'
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