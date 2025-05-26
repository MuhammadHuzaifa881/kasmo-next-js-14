import Spinner from '@/components/common/loader/Spinner';

const FullScreenLoader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner size={60} />
    </div>
  );
};

export default FullScreenLoader;
