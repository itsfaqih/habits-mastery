import { Link } from "react-router-dom";
import Balancer from "react-wrap-balancer";
import { Container } from "@/components/ui/container";
import { AnimatePresence, motion } from "framer-motion";

export function LandingPage() {
  return (
    <Container className="flex justify-center pt-48">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, translateY: 36 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, translateY: -36 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-800">
            Habits Mastery
          </h1>
          <p className="mt-4 text-lg text-center xl:px-48 text-slate-700">
            <Balancer>
              Getting closer to your goals with the power of small habits.
            </Balancer>
          </p>
          <div className="flex items-center gap-8 mt-8">
            <Link
              to="/how-it-works"
              className="font-medium rounded-lg hover:underline hover:underline-offset-8 text-slate-600 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-600"
            >
              How it works
            </Link>
            <Link
              to="/start"
              className="px-4 py-2 font-medium rounded-lg shadow-sm bg-slate-800 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-slate-700 focus-visible:outline-slate-600 text-slate-50"
            >
              Get started
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}
