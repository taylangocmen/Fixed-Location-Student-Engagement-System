# backend

To setup an AWS EC2 instance to compile and run the backend application:

  - Generate an ssh key for the instance and add it to your github account: ssh-keygen
  - sudo yum install git
  - sudo yum groupinstall "Development Tools"
  - sudo yum install openssl-devel
  - git clone git@github.com:taylangocmen/Fixed-Location-Student-Engagement-System.git capstone
  - cd capstone/backend
  - git submodule init
  - git submodule update
  - make
  - sudo bin/server
