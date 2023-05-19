import React from "react";

import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import PolicyCard from "../components/PolicyCard";
import policy from "../assets/fake-data/policy";
import Grid from "../components/Grid";

import heroSliderData from "../assets/fake-data/hero-slider";
import { Link } from "react-router-dom";

const Home = () => {
   return (
      <Helmet title="Trang chủ">
         {/* hero slider */}
         <HeroSlider data={heroSliderData} control={true} auto={true} timeOut={5000} />
         {/* end hero slider */}
         {/* policy section */}
         <Section>
            <SectionBody>
               <Grid col={4} mdCol={4} smCol={4} gap={20}>
                  {policy.map((item, index) => (
                     <Link to="/policy">
                        <PolicyCard
                           key={index}
                           name={item.name}
                           description={item.description}
                           icon={item.icon}
                        />
                     </Link>
                  ))}
               </Grid>
            </SectionBody>
         </Section>
         {/* end policy section */}
      </Helmet>
   );
};

export default Home;
