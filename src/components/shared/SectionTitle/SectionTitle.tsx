
const SectionTitle = ({ title }: { title: string }) => {
    return (
        <div className="w-48 mx-auto mb-12">
            <p className="text-gray-800 lg:text-2xl font-bold pr-4 sm:text-xl text-center border-b-2 border-gray-500">
                {title}
            </p>
        </div>
    );
};

export default SectionTitle;
