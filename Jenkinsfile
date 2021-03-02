pipeline {
  agent {
    docker {
      image 'node:alpine3.10'
    }

  }
  stages {
    stage('do the stuff') {
      steps {
        sh 'sudo chown -R 501:20 "/.npm"'
        sh 'npm install'
        sh 'npm run build'
        sh 'npm start'
      }
    }

  }
}