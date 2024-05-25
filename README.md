# DNS Manager

## Overview

DNS Manager is a web application designed to provide a central dashboard for automating the management of domains and DNS records in bulk on AWS Route 53.

## Features

- **MERN Stack**: Standardizes on the MERN stack for frontend, backend, and infrastructure layers.
- **AWS Route 53 Integration**: Seamless integration with AWS Route 53.
- **User-friendly Dashboard**: Provides an intuitive interface for uploading and viewing domains and DNS records.
- **Support for Various DNS Record Types**: Manages A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT, and DNSSEC records.
- **CRUD Operations**: Forms and modals for adding, editing, and deleting DNS record entries.
- **Search and Filters**: Offers filters and search options for easy navigation of bulk data.
- **Graphical Insights**: Displays charts and metrics for domain and record type distribution.
- **Bulk Uploads**: Supports CSV or JSON bulk uploads for domain/records data.
- **API Endpoints**: Backend API endpoints for CRUD operations on DNS records.
- **Secure Authentication**: Implements secure user authentication and authorization.

## Setup

### Clone the Repository

```bash
git clone https://github.com/nithin3q/dns_manager.git
```

## Setup

##Clone the repository:

```bash
git clone https://github.com/nithin3q/dns_manager.git

```

Install dependencies:

```bash
npm install
```

ENV FILE IN BACKEND - 

``` bash
export AWS_ACCESS_KEY_ID=<Your AWS Access Key ID>
export AWS_SECRET_ACCESS_KEY=<Your AWS Secret Access Key>
export AWS_REGION=<Your AWS Region>
```
Start the frontend:

``` bash
npm run dev
```

Start the development server:

``` bash
npm start
```



