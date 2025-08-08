import React from 'react'

const Footer = () => {
  return (
  <footer className=" bg-white/80 mt-3 py-4 border-t border-gray-200 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SpendZen - Your Personal Finance Companion
        </div>
      </footer>  )
}

export default Footer