
const SectionTitle = ({ title }: { title: string }) => {
    return (
        <div className="w-52 mx-auto mb-16">
            <p className="text-blue-600 lg:text-3xl font-bold pr-4 sm:text-xl text-center ">
                {title}
            </p>
        </div>
    );
};

export default SectionTitle;
