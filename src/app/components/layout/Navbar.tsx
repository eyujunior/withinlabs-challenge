import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/images/logo.png";
import { Cart } from "@/app/components/Cart";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
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
                        <Cart />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
