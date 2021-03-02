pipeline {
  agent {
    docker {
      image 'node:6-alpine'
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