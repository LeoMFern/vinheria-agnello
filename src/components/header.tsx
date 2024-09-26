"use client";

import Image from "next/image";
import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useCart } from "~/context/cart-context";

export default function Header() {
  const { items } = useCart();

  console.log(items);
  // const total = items.length;
	const total = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed w-full bg-white shadow">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 py-4 md:flex-row">
        <div className="flex items-center md:mb-0">
          <Link href="/">
            <Image
              src="https://placehold.co/150x50"
              alt="Agnello Logo"
              width={150}
              height={50}
              className="mr-4"
            />
          </Link>
          <nav className="hidden space-x-4 md:flex">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Vinhos
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Kits
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Mais Vendidos
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              Promoções
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="text-gray-600" />
          <Link href="/cart">
            <div className="relative">
              <ShoppingCart className="text-gray-600 hover:text-[#6d071a]" />
              {total !== 0 && (
                <p className="absolute bottom-0 right-0 flex min-w-6 translate-x-[50%] translate-y-[50%] transform justify-center rounded-full bg-red-500 px-2 py-1 text-xs text-white transition-colors ease-in-out hover:bg-black">
                  {total}
                </p>
              )}
            </div>
          </Link>
          <Link href="/account">
            <User className="text-gray-600 hover:text-[#6d071a]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
