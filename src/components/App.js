import { useTransform, useViewportScroll, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const App = () => {
  const [trigger, setTrigger] = useState(false);
  const { scrollYProgress, scrollY } = useViewportScroll();
  const scaleAnim = useTransform(scrollYProgress, [0, 0.1, 1], [1, 1.2, 1.8]);
  const yPosAnim = useTransform(scrollYProgress, [0, 0.1, 1], [0, 0, 0]);

  useEffect(() => {
    scrollY.onChange((x) => {
      if (x >= 200) {
        setTrigger(true);
      }
      if (x <= 200) {
        setTrigger(false);
      }
    });

    return () => scrollY.destroy();
  }, [scrollY]);

  return (
    <div className='h-[200vh]'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{ scale: scaleAnim, y: yPosAnim }}
        className='fixed top-[20rem] left-[calc(50%-14rem)] w-[28rem] h-[15rem] bg-red-500 scale-100 overflow-hidden'
      >
        <motion.div
          initial={{ opacity: 0, scale: 0, y: '-100%' }}
          animate={{
            opacity: trigger ? 1 : 0,
            scale: trigger ? 1 : 0,
            y: trigger ? '0%' : '-100%',
          }}
          transition={{ type: 'spring', stiffness: 250, damping: 25 }}
          className='w-full h-full flex items-center justify-center p-4 text-white'
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore
          aspernatur asperiores minima impedit minus est illum quam excepturi
          debitis quo.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default App;
