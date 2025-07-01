export default function Footer() {
  return (
    <footer className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Bottom Bar */}
        <div className="my-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} FLURS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
