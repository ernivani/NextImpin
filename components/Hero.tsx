import Image from "next/image";
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
          Créez facilement votre site web avec Impin !
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Impin offre une plateforme intuitive pour créer votre site internet en
          quelques glissements de souris. Gagnez en visibilité sans compromettre
          la qualité.
        </p>
        <button className="btn btn-primary btn-wide">
          Obtenez {config.appName}
        </button>
      </div>
      <div className="lg:w-full">
        <Image
          src="/product-demo.png"
          alt="Product Demo"
          className="w-full"
          priority={true}
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Hero;
