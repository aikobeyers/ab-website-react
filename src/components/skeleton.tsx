import styles from './skeleton.module.css';

interface SkeletonProps {
    width?:  number,
    height?: number,
    borderRadius?: number
}
export default function Skeleton(props: SkeletonProps){
    const dynamicSize = {
        height: props?.height ?? 100,
        width: props?.width ? `${props.width}%` : '100%',
        'borderRadius': props?.borderRadius ? `${props.borderRadius}px` : '0px'
    }

    return (
        <div className={styles.skeletonWrapper} style={dynamicSize}></div>
    )
}