import BgImage from '../../../assets/Banner/banner.jpg'

const Jumbotron = ({ name }: { name: string }) => {
    return (
        <section className="w-full bg-center bg-no-repeat bg-cover lg:h-[290px] md:h-[250px] sm:h-[200px] relative after:absolute after:bg-black after:opacity-50 after:top-0 after:left-0 after:w-full after:h-full" style={{
            backgroundImage: `url(${BgImage})`,
        }}>
            <div className="flex items-center h-full justify-center  sm:m-auto">
                <div className="">
                    <h2 className="lg:text-3xl sm:text-xl text-center text-white z-30 relative">
                        {name}
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default Jumbotron;
