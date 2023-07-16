
const SectionTitle = ({ title }: { title: string }) => {
    return (
        <div className="w-full">
            <p className="text-gray-800 text-2xl font-bold pr-4 sm:text-xl text-center">
                {title}
            </p>
        </div>
    );
};

export default SectionTitle;
