"use client";

import { LoginWithGoogleButton } from "./_components/login-with-google-button";
import Image from "next/image";
import CardWine from "~/components/card-wine";
import Stats from "~/components/stats";
import { Button } from "~/components/ui/button";
import { type getWines } from "~/server/db/select";
import Link from "next/link";
import { serialize } from "~/app/products/_components/nuqs-parsers";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-[#f5f0e8] text-[#6d071a]">
      <div className="m-auto w-full max-w-md rounded-3xl bg-[#f9f6f1] p-8 shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center justify-center text-center">
            <h1 className="font-serif text-4xl">
              <span className="block text-sm uppercase tracking-wide">
                Vinheria
              </span>
              Agnello
            </h1>
          </div>
          <form className=" pt-4">
            <div className="mb-4">
                <label className="block text-[#6d071a] text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-[#6d071a] leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Digite seu email"
                /> 
            </div>
            <div className="mb-6">
                <label className="block text-[#6d071a] text-sm font-bold mb-2" htmlFor="password">
                    Senha
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                />
                
            </div>
            <div className="flex flex-col items-center">
              <Link href="/products">
                <Button variant={"default"} size={"lg"}>
                  Entrar
                </Button>
              </Link>
            </div>
        </form>
          <div className="space-y-4">
            <LoginWithGoogleButton />
          </div>
          <div className="flex items-center space-x-2">
            <label
              htmlFor="terms"
              className="text-center text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ao ser cadastrado no app, você concorda com os Termos de serviço e
              com a Política de privacidade
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
