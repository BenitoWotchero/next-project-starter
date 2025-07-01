#!/bin/bash

# 🚀 Next.js Project Documentation Setup Script
# This script sets up a complete documentation structure for a new Next.js project

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project information
PROJECT_NAME=""
PROJECT_TYPE=""
INCLUDE_SECURITY=""
INCLUDE_GDPR=""
TARGET_DIR=""

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS] PROJECT_NAME"
    echo ""
    echo "Options:"
    echo "  -t, --type TYPE       Project type (startup|enterprise|personal|agency)"
    echo "  -s, --security       Include advanced security documentation"
    echo "  -g, --gdpr           Include GDPR compliance documentation"
    echo "  -d, --dir DIR        Target directory (default: current directory)"
    echo "  -h, --help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 my-nextjs-app"
    echo "  $0 --type startup --security --gdpr my-startup-app"
    echo "  $0 --dir ./projects/new-app enterprise-app"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--type)
            PROJECT_TYPE="$2"
            shift 2
            ;;
        -s|--security)
            INCLUDE_SECURITY="true"
            shift
            ;;
        -g|--gdpr)
            INCLUDE_GDPR="true"
            shift
            ;;
        -d|--dir)
            TARGET_DIR="$2"
            shift 2
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        -*)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
        *)
            if [[ -z "$PROJECT_NAME" ]]; then
                PROJECT_NAME="$1"
            else
                print_error "Multiple project names provided"
                show_usage
                exit 1
            fi
            shift
            ;;
    esac
done

# Validate required parameters
if [[ -z "$PROJECT_NAME" ]]; then
    print_error "Project name is required"
    show_usage
    exit 1
fi

# Set default values
if [[ -z "$TARGET_DIR" ]]; then
    TARGET_DIR="."
fi

if [[ -z "$PROJECT_TYPE" ]]; then
    PROJECT_TYPE="startup"
fi

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

print_info "Setting up documentation for: $PROJECT_NAME"
print_info "Project type: $PROJECT_TYPE"
print_info "Target directory: $TARGET_DIR"

# Create documentation structure
print_info "Creating documentation structure..."

mkdir -p docs/{
    architecture,
    security,
    performance,
    privacy,
    testing,
    deployment,
    design,
    analytics,
    development,
    devops,
    knowledge,
    team,
    legal,
    management
}

print_success "Documentation directories created"

# Copy template files from the repository
if [[ -f "../docs/OVERVIEW.MD" ]]; then
    print_info "Copying template files..."
    cp ../docs/OVERVIEW.MD docs/
    cp ../docs/CHECKLIST.MD docs/
    cp ../docs/STARTER.MD docs/
    print_success "Template files copied"
else
    print_warning "Template files not found. Please ensure you're running this from the project root."
fi

# Customize templates for the specific project
print_info "Customizing templates for project: $PROJECT_NAME"

# Update project name in templates
if [[ -f "docs/OVERVIEW.MD" ]]; then
    sed -i.bak "s/\[PROJECT_NAME\]/$PROJECT_NAME/g" docs/OVERVIEW.MD
    sed -i.bak "s/\[PROJECT_NAME\]/$PROJECT_NAME/g" docs/CHECKLIST.MD
    sed -i.bak "s/\[PROJECT_NAME\]/$PROJECT_NAME/g" docs/STARTER.MD
    rm docs/*.bak 2>/dev/null || true
    print_success "Project name updated in templates"
fi

# Create project-specific documentation based on type
case "$PROJECT_TYPE" in
    startup)
        print_info "Adding startup-specific documentation..."
        cat > docs/STARTUP_FOCUS.md << 'EOF'
# 🚀 Startup Focus Areas

## MVP Development
- [ ] Core feature definition
- [ ] User story mapping
- [ ] Technical debt management
- [ ] Scalability planning

## Growth Preparation
- [ ] Performance monitoring setup
- [ ] Analytics implementation
- [ ] A/B testing framework
- [ ] User feedback collection

## Investment Readiness
- [ ] Technical due diligence preparation
- [ ] Architecture documentation
- [ ] Security compliance
- [ ] Code quality metrics
EOF
        ;;
    enterprise)
        print_info "Adding enterprise-specific documentation..."
        cat > docs/ENTERPRISE_FOCUS.md << 'EOF'
# 🏢 Enterprise Focus Areas

## Compliance & Governance
- [ ] Security policy compliance
- [ ] Data governance procedures
- [ ] Audit trail requirements
- [ ] Regulatory compliance

## Integration & Architecture
- [ ] Legacy system integration
- [ ] Microservices architecture
- [ ] API versioning strategy
- [ ] Enterprise SSO integration

## Operations & Monitoring
- [ ] Enterprise monitoring solutions
- [ ] Incident response procedures
- [ ] Change management process
- [ ] Performance SLAs
EOF
        ;;
    agency)
        print_info "Adding agency-specific documentation..."
        cat > docs/AGENCY_FOCUS.md << 'EOF'
# 🎯 Agency Focus Areas

## Client Management
- [ ] Project scoping documentation
- [ ] Client communication protocols
- [ ] Handover procedures
- [ ] Maintenance agreements

## Development Efficiency
- [ ] Reusable component library
- [ ] Template documentation
- [ ] Deployment automation
- [ ] Quality assurance checklist

## Business Operations
- [ ] Time tracking integration
- [ ] Project cost analysis
- [ ] Resource allocation
- [ ] Portfolio documentation
EOF
        ;;
esac

# Add security documentation if requested
if [[ "$INCLUDE_SECURITY" == "true" ]]; then
    print_info "Adding advanced security documentation..."
    
    cat > docs/security/SECURITY_IMPLEMENTATION.md << 'EOF'
# 🔒 Security Implementation Guide

## Authentication & Authorization
- [ ] NextAuth.js setup
- [ ] Role-based access control
- [ ] JWT token management
- [ ] Session security

## API Security
- [ ] Rate limiting implementation
- [ ] API key management
- [ ] Input validation
- [ ] CORS configuration

## Data Protection
- [ ] Encryption at rest
- [ ] Encryption in transit
- [ ] PII data handling
- [ ] Secure backup procedures

## Security Testing
- [ ] Vulnerability scanning
- [ ] Penetration testing
- [ ] Security code review
- [ ] Dependency auditing
EOF
    print_success "Security documentation added"
fi

# Add GDPR documentation if requested
if [[ "$INCLUDE_GDPR" == "true" ]]; then
    print_info "Adding GDPR compliance documentation..."
    
    cat > docs/privacy/GDPR_IMPLEMENTATION.md << 'EOF'
# 🌍 GDPR Implementation Guide

## Data Mapping
- [ ] Personal data inventory
- [ ] Data flow documentation
- [ ] Third-party processors
- [ ] Data retention policies

## User Rights Implementation
- [ ] Data access requests
- [ ] Data portability
- [ ] Right to erasure
- [ ] Consent management

## Technical Measures
- [ ] Privacy by design
- [ ] Data minimization
- [ ] Pseudonymization
- [ ] Regular security assessments

## Documentation & Compliance
- [ ] Privacy impact assessments
- [ ] Record of processing activities
- [ ] Breach notification procedures
- [ ] Staff training documentation
EOF
    print_success "GDPR documentation added"
fi

# Create initial README for the docs folder
cat > docs/README.md << EOF
# 📚 $PROJECT_NAME Documentation

Welcome to the documentation for **$PROJECT_NAME**! This documentation follows the Next.js Project Starter template structure.

## 🚀 Quick Start

1. **Start with [STARTER.MD](STARTER.MD)** - Interactive workflow guide
2. **Review [OVERVIEW.MD](OVERVIEW.MD)** - Complete documentation structure
3. **Use [CHECKLIST.MD](CHECKLIST.MD)** - Quality assurance checklist

## 📋 Documentation Structure

### Core Templates
- **[OVERVIEW.MD](OVERVIEW.MD)** - Complete project documentation structure
- **[CHECKLIST.MD](CHECKLIST.MD)** - Quality assurance checklist (200+ items)
- **[STARTER.MD](STARTER.MD)** - Step-by-step documentation workflow

### Project Type
- **Type**: $PROJECT_TYPE
- **Security Enhanced**: $([ "$INCLUDE_SECURITY" == "true" ] && echo "Yes" || echo "No")
- **GDPR Compliant**: $([ "$INCLUDE_GDPR" == "true" ] && echo "Yes" || echo "No")

## 🎯 Next Steps

1. Open STARTER.MD and follow the workflow
2. Customize templates for your specific needs
3. Set up your development environment
4. Begin documenting your project architecture

## 🤝 Contributing

This documentation structure is based on the [Next.js Project Starter](https://github.com/BenitoWotchero/next-project-starter) template.

---

**Generated on**: $(date)
**Template Version**: 1.0.0
EOF

print_success "Documentation README created"

# Create a simple validation script
cat > scripts/validate-docs.sh << 'EOF'
#!/bin/bash

# Simple documentation validation script
echo "🔍 Validating documentation structure..."

required_files=(
    "docs/OVERVIEW.MD"
    "docs/CHECKLIST.MD"
    "docs/STARTER.MD"
    "docs/README.md"
)

for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file exists"
    else
        echo "❌ $file is missing"
    fi
done

# Count checkboxes in CHECKLIST.MD
if [[ -f "docs/CHECKLIST.MD" ]]; then
    checkbox_count=$(grep -c "- \[ \]" docs/CHECKLIST.MD)
    echo "📋 Found $checkbox_count checkboxes in CHECKLIST.MD"
fi

echo "🎉 Documentation validation complete!"
EOF

chmod +x scripts/validate-docs.sh
print_success "Validation script created"

# Final summary
echo ""
echo "🎉 Documentation setup complete!"
echo ""
print_success "Project: $PROJECT_NAME"
print_success "Location: $TARGET_DIR/docs"
print_success "Type: $PROJECT_TYPE"

if [[ "$INCLUDE_SECURITY" == "true" ]]; then
    print_success "Security documentation included"
fi

if [[ "$INCLUDE_GDPR" == "true" ]]; then
    print_success "GDPR documentation included"
fi

echo ""
print_info "Next steps:"
echo "  1. cd $TARGET_DIR"
echo "  2. open docs/STARTER.MD"
echo "  3. Follow the interactive workflow"
echo "  4. Run ./scripts/validate-docs.sh to check progress"
echo ""
print_info "For more information, visit:"
echo "  https://github.com/BenitoWotchero/next-project-starter" 