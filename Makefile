# Build both Next.js app and CLI
build:
	vp run build

# Clean build artifacts
clean:
	rm -rf .next
	rm -rf build
	rm -rf node_modules/.cache

# Update packages
update-packages:
	vp update
	vp install
