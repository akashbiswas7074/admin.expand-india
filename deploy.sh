#!/bin/bash

# Expand India - Deployment Script
# This script deploys the application using Docker

set -e

echo "🚀 Starting deployment of Expand India application..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down --remove-orphans

# Remove old images to free up space
print_status "Cleaning up old images..."
docker image prune -f

# Build and start the application
print_status "Building and starting the application..."
docker-compose up --build -d

# Wait for the application to start
print_status "Waiting for application to start..."
sleep 10

# Check if the application is running
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_status "✅ Application is running successfully!"
    print_status "🌐 Access your application at: http://localhost:3000"
    print_status "📊 Health check: http://localhost:3000/health"
else
    print_warning "Application might still be starting up. Please wait a moment and try again."
    print_status "You can check the logs with: docker-compose logs -f"
fi

# Show container status
print_status "Container status:"
docker-compose ps

# Show logs
print_status "Recent logs:"
docker-compose logs --tail=20

echo ""
print_status "🎉 Deployment completed!"
echo ""
print_status "Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop application: docker-compose down"
echo "  - Restart application: docker-compose restart"
echo "  - Update application: ./deploy.sh"
echo ""
print_status "For production deployment, consider:"
echo "  - Setting up SSL certificates"
echo "  - Configuring environment variables"
echo "  - Setting up monitoring and logging"
echo "  - Configuring backup strategies" 