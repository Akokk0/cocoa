import { useRef, useEffect, useState } from 'react';

type InfiniteScrollProps = {
    loadMore: () => void;
    children: React.ReactNode;
    threshold?: number;
    hasMore: boolean;
    loader?: React.ReactNode;
    endMessage?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ loadMore, children, threshold = 900, hasMore, loader, endMessage, ...props }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;
        const handleScroll = () => {
            if (!containerRef.current) return;
            if (hasMore && containerRef.current.scrollHeight - containerRef.current.scrollTop - containerRef.current.clientHeight < threshold) {
                setIsFetching(true);
            }
        };
        containerRef.current.addEventListener('scroll', handleScroll);
        return () => containerRef.current!.removeEventListener('scroll', handleScroll);
    }, [threshold, hasMore]);

    useEffect(() => {
        if (isFetching) {
            loadMore();
        }
    }, [isFetching]);

    useEffect(() => {
        if (isFetching) {
            setIsFetching(false);
        }
    }, [children]);

    return (
        <div ref={containerRef} {...props}>
            {children}
            {isFetching && loader}
            {!hasMore && endMessage}
        </div>
    );
};

export default InfiniteScroll;