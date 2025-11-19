Set up a AWS EC2 instance with AMI as ubuntu & instance type as t2.medium

**Security Group Configuration**
**Make sure EC2 security group allows**

 Port	               Purpose              
  22                  SSH
 3306	                MySQL (optional for external access)
 5000	                Backend
 5173	                Vite frontend
80/443	              If using Nginx

**Update & Install Required Packages**
      sudo apt update
      sudo apt install mysql-server -y
      sudo apt install nodejs -y
      sudo apt install npm -y

**✔ Login to MySQL as root**
      sudo mysql -u root

**Set root password**
      ALTER USER 'root'@'localhost' 
      IDENTIFIED WITH mysql_native_password BY 'your_password';
      FLUSH PRIVILEGES;

**Create Application Database**
      CREATE DATABASE react_app_db;

**Import Existing SQL Dump**
      mysql -u root -p react_app_db < /home/ubuntu/Dump20251118latest.sql

**Set Up Node.js Backend**
**Navigate into the backend folder:**

cd ~/Backend
Fix permissions (if needed):
sudo chmod -R 777 /home/ubuntu/Backend/

**Install dependencies:**
npm install

**Set environment file:**
vi .env

**Example .env:**
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=react_app_db
PORT=5000

**Run locally (for testing):**
npm run start


**Set up Frontend**
**Navigate into the backend folder:**

cd ~/Frontend

**edit the App.jsx at Frontend/src/**
at 57th line change the localhost to your <instance_ip>
** at Frontend/src/components/  edit Login.jsx**
at 112th line change the localhost to your <instance_ip>
**at Frontend/src/components/  edit Register.jsx**
at 131th line change the localhost to your <instance_ip>

**Fix permissions (if needed):**
sudo chmod -R 777 /home/ubuntu/Frontend/

**Install dependencies:**
npm install

**Run locally (for testing):**
npm run dev -- --host


------------------------------------------------**setup using pm2**--------------------------------------------------------
**Install PM2 globally**:

sudo npm install -g pm2

**Start backend:**
cd Backend
pm2 start npm --name "backend" -- run start

**Start frontend:**
cd Frontend
pm2 start npm --name "frontend" -- run dev -- --host


**✔ Backend: http://EC2_PUBLIC_IP:5000
✔ Frontend (Vite Dev Mode): http://EC2_PUBLIC_IP:5173**
