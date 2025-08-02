# CI/CD Pipeline Documentation

This document describes the comprehensive CI/CD pipeline implemented for the Cryptomafia project to ensure main branch stability and reliable builds.

## Overview

The CI/CD pipeline consists of three main workflows:

1. **PR Checks** (`pr-checks.yml`) - Validates all pull requests
2. **Main Branch Build** (`build.yml`) - Comprehensive builds on main branch
3. **Android Release** (`android-release.yml`) - Builds Android APKs for releases

## Workflow Details

### 1. PR Checks (`pr-checks.yml`)

**Triggers:**
- Pull requests targeting `main` branch

**Jobs:**

#### Frontend Job
- **Environment:** Ubuntu Latest
- **Checks:**
  - ESLint code quality and style
  - TypeScript compilation and type checking
  - Successful build generation
- **Artifacts:** Frontend build artifacts (1 day retention)

#### Backend Job  
- **Environment:** Ubuntu Latest with system dependencies
- **Checks:**
  - Rust code formatting (`cargo fmt --check`)
  - Rust linting (`cargo clippy` with warnings as errors)
  - Unit tests (`cargo test`)
  - Release build compilation
- **Dependencies:** WebKit, GTK, and other Tauri requirements

#### Integration Job
- **Depends on:** Successful frontend and backend jobs
- **Purpose:** Validates full Tauri application build
- **Process:**
  - Downloads frontend artifacts
  - Builds complete Tauri application
  - Verifies executable generation

#### Android Check Job
- **Triggers:** Only on pull requests
- **Purpose:** Validates Android build setup without full APK generation
- **Setup:** Java 17, Android SDK, Rust with Android targets
- **Validation:** Tauri Android init and build configuration check

### 2. Main Branch Build (`build.yml`)

**Triggers:**
- Pushes to `main` branch
- Weekly scheduled runs (Sundays at midnight UTC)
- Manual workflow dispatch

**Features:**
- **Comprehensive Quality Checks:** All frontend and backend validations
- **Security Auditing:** 
  - Frontend dependency audit (`npm audit`)
  - Rust security audit (`cargo audit`)
- **Build Artifacts:** 7-day retention with build summaries
- **Monitoring:** Weekly builds catch dependency drift

### 3. Android Release (`android-release.yml`)

**Triggers:**
- Git tags matching `v*` pattern
- Manual workflow dispatch with optional tag input

**Pre-build Validation:**
- Validates release trigger legitimacy
- Prevents accidental builds

**Quality Gates:**
- Frontend linting and type checking
- Backend formatting and linting
- All quality checks must pass before APK build

**Build Process:**
- Temporarily adds Android configuration to Tauri config
- Builds APK for ARM64 Android devices
- Restores original configuration
- Uploads artifacts with 30-day retention

**Release Automation:**
- Automatic GitHub release creation for tags
- Pre-release detection for alpha/beta/rc tags
- Auto-generated release notes

## Quality Standards

### Frontend Standards
- **ESLint:** Zero errors/warnings allowed
- **TypeScript:** Strict type checking with no compilation errors
- **Build:** Must generate production-ready artifacts
- **React:** Fast Refresh compliance for development

### Backend Standards
- **Formatting:** Strict `rustfmt` compliance
- **Linting:** Zero Clippy warnings (treated as errors)
- **Testing:** All unit tests must pass
- **Compilation:** Clean release builds required

### Integration Standards
- **Full Build:** Complete Tauri application must compile
- **Executable:** Generated binary must be valid
- **Dependencies:** All system dependencies resolved

## Caching Strategy

### Rust Dependencies
- **Cache Key:** Workspace-based with job-specific suffixes
- **Scope:** `src-tauri` workspace
- **Special Cases:** Separate cache for Android builds

### Node.js Dependencies
- **Cache:** NPM cache based on `package-lock.json`
- **Scope:** `frontend` directory
- **Strategy:** LTS Node.js versions

### Tools Caching
- **Tauri CLI:** Cached binary with version-specific keys
- **System Dependencies:** APT cache for faster dependency installation

## Branch Protection Recommendations

To fully leverage this CI/CD pipeline, enable the following branch protection rules for the `main` branch:

### Required Status Checks
```yaml
required_status_checks:
  strict: true
  contexts:
    - "Frontend (TypeScript/React)"
    - "Backend (Rust/Tauri)" 
    - "Integration Build"
    - "Android Build Check"
```

### Additional Protection Rules
```yaml
restrictions:
  - require_code_owner_reviews: true
  - dismiss_stale_reviews: true
  - require_review_from_codeowners: true
  - required_approving_review_count: 1
  - restrict_pushes: true
  - allow_force_pushes: false
  - allow_deletions: false
```

## Monitoring and Maintenance

### Build Notifications
- Failed builds on `main` branch should trigger immediate investigation
- Weekly build failures may indicate dependency issues
- Android build failures often relate to configuration drift

### Performance Monitoring
- Frontend build times should remain under 3 minutes
- Backend compilation should complete within 10 minutes
- Full integration builds target under 15 minutes

### Dependency Management
- Weekly builds catch dependency vulnerabilities
- Security audits prevent known CVE exposure
- Automated dependency updates should be tested through PR checks

## Troubleshooting

### Common Issues

#### Frontend Build Failures
```bash
# Local debugging
cd frontend
npm ci
npm run lint
npm run build
```

#### Backend Build Failures
```bash
# Local debugging  
cd src-tauri
cargo fmt --check
cargo clippy --all-targets --all-features
cargo test
cargo build --release
```

#### Android Build Issues
- **Java Version:** Ensure Java 17 is used
- **Android SDK:** Verify SDK installation
- **Rust Targets:** Check `aarch64-linux-android` target installation
- **System Dependencies:** Ensure all required libraries are installed

### Debug Commands
```bash
# Check tool versions
node --version
npm --version
rustc --version
cargo --version
java -version

# Verify Android setup
$ANDROID_HOME/tools/bin/sdkmanager --list
rustup target list --installed
```

## Security Considerations

### Secrets Management
- No hardcoded secrets in workflows
- Use GitHub Secrets for sensitive data
- Android signing keys should use encrypted secrets

### Dependency Security
- Regular security audits via `npm audit` and `cargo audit`
- Automated dependency updates with security focus
- Vulnerability scanning in CI pipeline

### Build Isolation
- Each job runs in isolated environment
- No cross-job secret sharing
- Clean build environments for reproducibility

## Performance Optimization

### Parallel Execution
- Frontend and backend jobs run concurrently
- Integration job waits for both to complete
- Android check runs independently for PRs

### Incremental Builds
- Rust incremental compilation via cache
- NPM dependency caching
- Tool binary caching (Tauri CLI)

### Resource Management
- Concurrency limits prevent resource exhaustion
- Cancel-in-progress for updated PRs
- Artifact cleanup with appropriate retention

## Future Enhancements

### Potential Additions
- **Code Coverage:** Frontend and backend coverage reporting
- **Performance Testing:** Build time and bundle size monitoring
- **E2E Testing:** Automated UI testing with Playwright
- **Release Automation:** Automated version bumping and changelog generation
- **Multi-platform Builds:** Windows and macOS desktop builds
- **Deploy Previews:** Temporary deployments for PR review

### Monitoring Improvements
- **Build Analytics:** Track build performance over time
- **Failure Analysis:** Automated failure categorization
- **Notification Integration:** Slack/Discord build status updates
- **Dependency Tracking:** Automated dependency update PRs

This CI/CD pipeline ensures that the main branch remains stable while providing comprehensive quality checks and automated release processes.