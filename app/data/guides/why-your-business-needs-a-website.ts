import { CURRENT_YEAR } from "@/app/constants";
import type { Guide } from "./types";

const resource: Guide = {
  slug: "why-your-business-needs-a-website",
  datePublished: "2026-03-10",
  dateModified: new Date(),
  title: {
    en: "Does Your Business Need a Website?",
    ar: "ضرورة الموقع الإلكتروني لشركتك",
  },
  metaTitle: {
    en: `Do I Need a Website for My Business? (${CURRENT_YEAR})`,
    ar: `هل مشروعي محتاج موقع إلكتروني؟ (${CURRENT_YEAR})`,
  },
  excerpt: {
    en: "The first thing a potential customer does is search for you online, most likely using Google or an AI like ChatGPT. If they find your competitors instead of you, you've likely lost the sale before you've even had a chance to present yourself. In this guide we explain why having a website is crucial for this scenario.",
    ar: "لما بتسمع عن شركة أو خدمة جديدة، أول حاجة بتعملها إيه؟ تلقائياً بتفتح جوجل أو شات جي بي تي وتكتب اسمها علشان تطمن وتشوف تفاصيلها. العميل اللي بيدور على شركتك بيعمل نفس الشيء.",
  },
  content: {
    en: `
<p>A professional website is your official address online. The moment a customer lands on it, they know they are dealing with something real, established, and worth trusting. Imagine the following scenario: you hear about a company or service you are considering dealing with. What is the first thing you do? You open Google or ChatGPT and search for it to make sure it is legitimate. Your customers do exactly the same thing. If they search for your business and find no website, they will instead find your competitor's site, and in that case you have very likely already lost that client before you've even had a chance to present yourself. This is the reality of the digital landscape today.</p>

<h2>Why a Facebook or Instagram page is not enough</h2>
<p>Social media is great for getting discovered, but it should not be the home of your business. Here is why relying on it alone puts you at risk:</p>

<ul>
  <li><strong>Instant trust:</strong> Anyone can set up a free Instagram page in two minutes. A dedicated website shows customers that you have invested in your brand and are here to stay.</li>
  <li><strong>Total ownership:</strong> Social media platforms change their rules constantly. Your page can get hacked, shadowbanned, or shut down overnight by an algorithm. You own your website completely, and no one can take it away from you.</li>
  <li><strong>Be found on Google:</strong> When someone searches for a "clinic in Heliopolis" or a "graphic designer in Egypt", Google shows websites first, not social media profiles.</li>
  <li><strong>Save time and automate:</strong> Instead of spending hours replying to "Price please" in your DMs, your website can display your services, take bookings, and collect client details automatically 24/7.</li>
</ul>

<h2>Paid ads vs. a website</h2>
<p>Paid advertising is an essential part of growing a business online. Facebook, Instagram, and Google Ads can help you reach the right customers quickly and generate leads when you need them. But relying entirely on paid ads means paying for every opportunity. A professional website adds another channel by allowing potential customers to discover your business through organic Google searches, bringing in leads without paying for every click. Here is how the two investments compare side by side:</p>

<table>
  <thead>
    <tr>
      <th>Marketing Channel</th>
      <th>Cost Structure</th>
      <th>What Happens When You Stop Paying?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Paid Social Media Ads</strong></td>
      <td>24/7, expensive daily budget</td>
      <td>Traffic stops immediately</td>
    </tr>
    <tr>
      <td><strong>A Professional Website</strong></td>
      <td>24/7, one-time cost</td>
      <td>Free traffic from Google forever</td>
    </tr>
  </tbody>
</table>

<p>A website makes your ads more effective: when a customer lands on it, they trust you faster and are more likely to buy, so your ad spend stops going to waste.</p>

<h2>The bottom line</h2>
<p>Running a business in ${CURRENT_YEAR} without a website means losing customers before they ever get the chance to know you. People search online to compare options, check credibility, and decide who they trust. If your business is not there, a competitor probably is. A professional website helps you build trust, attract more customers, and strengthen your presence in the market.</p>`,

    ar: `
<p>لما بتسمع عن شركة أو خدمة جديدة، أول حاجة بتعملها إيه؟  تلقائياً بتفتح جوجل وتكتب اسمها علشان تطمن وتشوف تفاصيلها. العميل اللي بيدور على شركتك بيعمل نفس الشيء، ولو دخل يدور عليك ومالقاش ليك موقع، وفي نفس الوقت لقى موقع احترافي لمنافس ليك، بنسبة كبيرة إنت خسرت العميل للمنافس قبل حتى ما تاخد فرصة تعرض عليه شغلك. الموقع الإلكتروني الاحترافي هو بمثابة "عقد الثقة" والمقر الرسمي لشركتك على الإنترنت؛ أول ما العميل بيدخله، بيعرف فوراً إنه بيتعامل مع كيان حقيقي، مستقر، ووراه براند قوي يقدر يثق فيه ويدفعله وهو مطمن.</p>

<h2>ليه صفحة الفيسبوك أو الإنستجرام مش كفاية؟</h2>
<p>السوشيال ميديا ممتازة علشان الناس تعرفك، لكنها متصلحش تكون المقر الأساسي لشغلك. الجدول ده بيوضحلك الفرق والخطورة لو معتمد على السوشيال ميديا بس:</p>

<ul>
  <li><strong>المصداقية الفورية:</strong> أي حد يقدر يعمل صفحة إنستجرام ببلاش في دقيقتين، لكن الموقع الاحترافي بيثبت للعميل إنك صاحب عمل جاد ومستثمر في مشروعك.</li>
  <li><strong>التحكم والأمان الكامل:</strong> قواعد السوشيال ميديا بتتغير كل يوم، وصفحتك معرضة تتقفل، تتسرق، أو ريتش الصفحة يقع بسبب الخوارزميات. موقعك ملكك بنسبة 100% ومحدش يقدر يتحكم فيه غيرك.</li>
  <li><strong>الظهور في نتائج بحث جوجل:</strong> لما حد يكتب على جوجل "عيادة في مصر الجديدة" أو "مكتب ديكور في القاهرة"، جوجل بيظهر المواقع الإلكترونية في الأول مش صفحات الفيسبوك.</li>
  <li><strong>توفير وقتك ومجهودك:</strong> بدل ما تقضي يومك ترد على رسائل "بكام" و"التفاصيل"، موقعك بيعرض خدماتك وأسعارك بشكل منظم وبيجمع بيانات العملاء ومواعيد الحجز تلقائياً طول الـ 24 ساعة.</li>
</ul>

<h2>الحسبة المالية: الإعلانات المدفوعة ضد الموقع الإلكتروني</h2>
<p>الإعلانات المدفوعة بتوقف تجيبلك عملاء بمجرد ما توقف الدفع، لكن الموقع الإلكتروني الاحترافي بيفضل يجيبلك زيارات مجانية من جوجل لسنين بعد تكلفة بناء مرة واحدة. أغلب أصحاب المشاريع بيعتمدوا بالكامل على إعلانات فيسبوك وإنستجرام المموله — دي المقارنة الاستثمارية بالتفصيل:</p>

<table>
  <thead>
    <tr>
      <th>القناة التسويقية</th>
      <th>طريقة الدفع</th>
      <th>إيه اللي بيحصل لما توقف دفع؟</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>الإعلانات المموّلة</strong></td>
      <td>ميزانية يومية مستمرة ومكلفة</td>
      <td>الرسائل والعملاء بيقفوا تماماً.</td>
    </tr>
    <tr>
      <td><strong>الموقع الإلكتروني الاحترافي</strong></td>
      <td>تكلفة بناء مرة واحدة</td>
      <td>بيفضل يجيب عملاء لسنين قدام.</td>
    </tr>
  </tbody>
</table>

<p>ده مش معناه إنك توقف إعلانات، بالعكس؛ الموقع بيخلي إعلاناتك تنجح أكتر لأن العميل لما بيدخله بيثق فيك ويشتري أسرع، وبكده مش بتضيع فلوس إعلاناتك على الفاضي. لو عايز تعرف التكلفة الفعلية، اقرأ <a href='/ar/guides/website-cost-in-egypt'>دليل تكلفة المواقع في مصر (${CURRENT_YEAR})</a>.</p>`,
  },
  metaDescription: {
    en: `Discover why your business in Egypt needs a website in ${CURRENT_YEAR}: real credibility, Google visibility, and ROI that Instagram and Facebook simply cannot match.`,
    ar: `هل فعلاً محتاج موقع إلكتروني في مصر في ${CURRENT_YEAR}؟ اكتشف فوايد حقيقية: المصداقية، التحكم، الظهور في جوجل، والعائد بالجنيه. وليه إنستجرام وفيسبوك مش كفاية.`,
  },
  readingMinutes: { en: 4, ar: 3 },
};

export default resource;  