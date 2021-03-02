pipeline {
  agent {
    node {
      label 'node'
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
}