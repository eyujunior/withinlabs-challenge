import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/images/logo.png";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-[1400px] mx-auto px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <Image src={logo} alt="Logo" width={100} />
                        </Link>
                    </div>

                    {/* Cart Icon */}
                    <div className="flex items-center">
                        <Link
                            href="/cart"
                            className="relative flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-full transition duration-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>

                            <span className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                3
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
