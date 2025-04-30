import { Link } from "react-router-dom";
import InfoSection from "../components/common/InfoSection";
import YouTubeVideo from "../components/common/YoutubeVideo";

export default function WhyHealthyEatingMatters() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 min-h-screen">
      <h1 className="text-3xl text-[#08519C] font-bold mb-4 flex items-center justify-center">
        Why Does Eating Healthy Matter?
      </h1>
      <p className="text-lg mb-6 text-black">
        Food delivers the nutrients your body needs to function. A poor <Link to="/Diet-Foods"><span className="text-[#2171B5] ">diet</span></Link> can
        affect your health severely.
      </p>
      <YouTubeVideo />
      <InfoSection
        title="Increased Risk From Overeating"
        items={[
          "Type 2 Diabetes",
          "Obstructive Sleep Apnea",
          "Heart Disease",
          "Liver Disease",
          "Kidney Disease",
        ]}
      />

      <InfoSection
        title="Why Diet Quality Matters"
        description={
          <>
          <p>The quality of your <Link to="/Diet-Foods"><span className="text-[#2171B5] ">diet</span></Link> can affect your longevity, disease risk, and even mental health.</p>
          </>
        }
      />

      <InfoSection
        title="Scientific Backing"
        description={<>
        <p>Studies suggest <Link to="/Diet-Foods"><span className="text-[#2171B5] ">diets</span></Link> high in ultra-processed foods are linked to increased mortality and chronic illnesses.</p>
        </>}
      />

      <InfoSection
        title="Diet diversity"
        description="Eating a variety of foods may be difficult if you’re a picky eater. If that’s the case, try to introduce new foods one at a time.
        If you don’t eat many vegetables, start by adding a favorite vegetable to one or two meals per day. You can build off of this at a pace that is comfortable to you.
        Although you may not enjoy trying new foods, research shows that the more you’re exposed to a food, the greater your chances of growing accustomed to it."
        items={[
          "supports your gut bacteria",
          "promotes a healthy body weight",
          "promotes longevity",
          "protects against chronic disease",
        ]}
      />

      <InfoSection
        title="Do you have to follow a certain diet to eat healthy?"
        description={<>
          <p>Although certain people need — or choose — to avoid particular foods or adopt <Link to="/Diet-Foods"><span className="text-[#2171B5] ">diets</span></Link> for health reasons, you don’t have to follow any specific <Link to="/Diet-Foods"><span className="text-[#2171B5] ">diet</span></Link> to feel your best.
        “Healthy eating” simply means fueling your body with mostly nutritious foods.
        The specifics may be different for each person depending on location, financial situation, culture, and taste preferences.</p>
        </>}
      />

      <InfoSection
        title="Why Diet Quality Matters"
        description={<>
        <p>The quality of your <Link to="/Diet-Foods"><span className="text-[#2171B5] ">diet</span></Link> can affect your longevity, disease risk, and even mental health.</p>
        </>}
      />

      <InfoSection
        title="The takeaway"
        description={<>
        <p>Although healthy eating may look a bit different for everyone, balanced <Link to="/Diet-Foods"><span className="text-[#2171B5] ">diets</span></Link> are generally rich in nutrient-dense foods, low in highly processed foods, and comprised of filling meals and snacks. If you want detailed, individualized dietary advice, consult an experienced dietitian.</p>
        </>}
      />

      <InfoSection
        title="Macronutrient ratios"
        description={
          <>
          <p>Macronutrients — the main nutrients you get from food — are carbs, fat, and protein. (Fiber is considered a type of carb.)

Generally, your meals and snacks should be balanced between the three. In particular, adding protein and fat to fiber-rich carb sources makes dishes more filling and tastyTrusted Source.

For example, if you’re snacking on a piece of fruit, adding a spoonful of nut butter or a bit of cheese helps keep you fuller than if you were to eat the fruit alone.

However, it’s fine if your <Link to="/Diet-Foods"><span className="text-[#2171B5] ">Diet</span></Link> isn’t balanced all the time.

Counting macros and following a set macronutrient plan isn’t necessary for most people — except athletes, people seeking a specific body composition, and those who need to gain muscle or fat for medical reasons.

Plus, counting macros and obsessing about staying within a certain macro range may lead to an unhealthy fixation with food and calories or cause disordered eating tendencies.

It’s important to note that some people may thrive on <Link to="/Diet-Foods"><span className="text-[#2171B5] ">diets</span></Link> that are low in carbs and high in fat and protein — or low in fat and high in carbs. However, even on these <Link to="/Diet-Foods"><span className="text-[#2171B5] ">diets</span></Link>, macronutrient counting typically isn’t necessary.

For example, if you feel your best on a <Link to="/Low-carbs"><span className="text-[#2171B5] ">Low Carb</span></Link> <Link to="/Diet-Foods"><span className="text-[#2171B5] ">diets</span></Link>, simply choosing low carb foods like nonstarchy veggies, proteins, and fats more often than high carb foods will usually suffice.</p>
          </>
        }
      />

      <InfoSection
        description="If you want detailed, individualized dietary advice, consult an experienced dietitian."
        link={{
          href: "https://www.healthline.com/nutrition/how-to-eat-healthy-guide",
          text: "Learn More on Healthline",
        }}
      />
    </div>
  );
}
