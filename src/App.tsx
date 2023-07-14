import {
  MotionValue,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import "./index.css";
import { useRef } from "react";

function App() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
  }) as MotionValue<number>;
  const scale = useTransform(scrollYProgressSpring, [0, 1], [1, 12]);
  const imageX = useTransform(scrollYProgressSpring, [0, 1], [50, 0]);
  const imageXCalc = useMotionTemplate`max(0px, calc(${imageX}% + calc(${imageX}vw - 300px)))`;

  return (
    <main>
      <div ref={ref} className="relative z-10 h-[200vh] overflow-clip">
        <motion.div
          style={{ scale }}
          className="hero-background sticky left-0 top-0 grid h-screen origin-[50%_70%] gap-2 p-6 pt-12 [grid-template-rows:4fr_1fr] md:origin-[90%_40%] md:pt-20"
        >
          <div className="window-mask flex flex-col rounded-3xl bg-white p-12 md:flex-row">
            <div className="flex h-full flex-col">
              <h1 className="mb-5 max-w-[12ch] text-4xl font-bold leading-[0.85] md:my-auto md:text-[80px] xl:text-[128px]">
                Playing with masks and Framer Motion.
              </h1>
              <p className="text-lg md:text-3xl">
                This animation is inspired by the Runway.com homepage. <br />
                Recreated by frontend.fyi.
              </p>
            </div>
            <div className="mx-auto -mb-7 mt-4 box-content aspect-[5/8] w-[150px] min-w-[150px] rounded-full border-[4px] border-gray-300 md:my-auto md:-mr-1 md:ml-auto md:w-[300px] md:min-w-[300px]" />
          </div>
          <div className="grid grid-flow-row grid-cols-3 gap-2">
            <div className="col-span-2 rounded-3xl border border-white" />
            <a className="flex items-center justify-center rounded-3xl bg-orange-400 text-center text-lg font-bold text-slate-900 md:text-5xl">
              Early Access
            </a>
          </div>
        </motion.div>
      </div>
      <div className="mt-[-200vh] h-[200vh] overflow-clip bg-blue-100 pb-20">
        <motion.span
          style={{ x: imageXCalc }}
          className="sticky top-1/2 mx-auto block aspect-video w-[1600px] max-w-[90%] rounded-[60px] bg-gray-300 shadow-2xl md:top-1/4"
        />
      </div>
      <div className="space-y-[80px] bg-blue-100 md:text-[300px]">
        <p>Some more content</p>
        <p>So there's</p>
        <p>Some room</p>
        <p>To scroll...</p>
      </div>
    </main>
  );
}

export default App;
