#!/bin/bash

# RKS.Ad Setup Script
# This script automates the setup process for local development

set -e

echo "🚀 RKS.Ad - Premium Advocate Portfolio Setup"
echo "=============================================="
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ pnpm version: $(pnpm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    
    echo ""
    echo "⚠️  Please update .env.local with your Supabase credentials:"
    echo "   NEXT_PUBLIC_SUPABASE_URL=your_url"
    echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key"
    echo ""
    read -p "Press Enter once you've updated .env.local..."
fi

# Build the project
echo ""
echo "🔨 Building the project..."
pnpm build

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  pnpm dev"
echo ""
echo "Then open your browser to: http://localhost:3000"
echo ""
echo "Happy coding! 🎉"
