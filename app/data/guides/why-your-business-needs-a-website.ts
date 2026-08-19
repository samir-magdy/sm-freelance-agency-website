import { CURRENT_YEAR } from "@/app/constants";
import type { Guide } from "./types";

const resource: Guide = {
  slug: "why-your-business-needs-a-website",
  datePublished: "2026-03-10",
  dateModified: new Date(),
  title: {
    en: "Does Your Business Need a Website?",
    ar: "لماذا يحتاج مشروعك إلى موقع إلكتروني؟",
  },
  excerpt: {
    en: "The first thing a potential customer does is search for you online, most likely using Google or an AI like ChatGPT. If they find your competitors instead of you, you've likely lost the sale before you've even had a chance to present yourself. In this guide we explain why having a website is crucial for this scenario.",
    ar: "عندما تسمع عن شركة أو خدمة جديدة، ما أول ما تفعله؟ غالبًا تفتح جوجل أو ChatGPT وتكتب اسمها لتطمئن وتطّلع على تفاصيلها. والعميل الذي يبحث عن شركتك يفعل الشيء نفسه تمامًا.",
  },
  content: {
    en: `
<p>A professional website is absolutely essential for a business that wants to build a strong market presence, it is your official address online. The moment a customer lands on it, they know they are dealing with something real, established, and worth trusting. Imagine the following scenario: you hear about a company or service you are considering doing business with. What is the first thing you do? You open Google or ChatGPT and search for it to make sure it is legitimate. Your customers do exactly the same thing. If they search for your business and find no website, they will instead find your competitor's site, and in that case you have very likely already lost that client before you've even had a chance to present yourself. This is the reality of the digital landscape today.</p>

<h2>Why social media is not enough</h2>
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

    ar: `<p>يُعَدّ الموقع الإلكتروني الاحترافي أمرًا ضروريًا للغاية لأي شركة تسعى إلى بناء حضور قوي في السوق. عندما تسمع عن شركة أو خدمة جديدة، ما هو أول شيء تفعله؟ تلقائياً، تفتح محرك بحث جوجل وتكتب اسمها لتطمئن وتعرف المزيد من التفاصيل. العميل الذي يبحث عن شركتك يقوم بالشيء ذاته تماماً. وإذا بحث عنك ولم يجد لك موقعاً إلكترونياً، وفي الوقت نفسه وجد موقعاً احترافياً لأحد منافسيك، فبنسبة كبيرة ستخسر هذا العميل لصالح المنافس قبل حتى أن تحظى بفرصة عرض خدماتك عليه. الموقع الإلكتروني الاحترافي هو بمثابة "عقد الثقة" والمقر الرسمي لشركتك على الإنترنت؛ فبمجرد دخول العميل إليه، يدرك فوراً أنه يتعامل مع كيان حقيقي ومستقر، تدعمه علامة تجارية قوية يمكنه الوثوق بها والدفع لها وهو مطمئن.</p>

<h2>لماذا لا تكفي صفحة فيسبوك أو إنستغرام؟</h2>
<p>وسائل التواصل الاجتماعي ممتازة لكي يتعرف الناس عليك، لكنها لا تصلح لتكون المقر الأساسي لعملك. النقاط التالية توضح لك الفرق وحجم المخاطرة إذا اعتمدت على منصات التواصل الاجتماعي وحدها:</p>

<ul>
  <li><strong>المصداقية الفورية:</strong> يمكن لأي شخص إنشاء صفحة على إنستغرام مجاناً في غضون دقيقتين، لكن الموقع الإلكتروني الاحترافي يثبت للعميل أنك صاحب عمل جاد ومستثمر حقيقي في مشروعك.</li>
  <li><strong>التحكم والأمان الكامل:</strong> تتغير قواعد وسائل التواصل الاجتماعي كل يوم، وصفحتك مُعرضة للإغلاق أو الاختراق، أو حتى تراجع نسبة الوصول بسبب الخوارزميات. أما موقعك الإلكتروني فهو ملكك بنسبة 100% ولا يمكن لأحد التحكم فيه غيرك.</li>
  <li><strong>الظهور في نتائج بحث جوجل:</strong> عندما يبحث شخص عبر جوجل عن "عيادة في مصر الجديدة" أو "مكتب ديكور في القاهرة"، فإن جوجل يعرض المواقع الإلكترونية في مقدمة النتائج وليس صفحات فيسبوك.</li>
  <li><strong>توفير وقتك ومجهودك:</strong> بدلاً من قضاء يومك في الرد على رسائل مثل "كم السعر؟" و"ما التفاصيل؟"، يعرض موقعك خدماتك وأسعارك بشكل منظم، ويجمع بيانات العملاء ومواعيد الحجز تلقائياً على مدار الساعة.</li>
</ul>

<h2>المعادلة المالية: الإعلانات المدفوعة مقابل الموقع الإلكتروني</h2>
<p>تتوقف الإعلانات المدفوعة عن جلب العملاء بمجرد توقفك عن الدفع، لكن الموقع الإلكتروني الاحترافي يستمر في جلب زيارات مجانية من جوجل لسنوات طويلة بعد تكلفة بنائه لمرة واحدة. يعتمد أغلب أصحاب المشاريع كلياً على إعلانات فيسبوك وإنستغرام الممولة — إليك هذه المقارنة الاستثمارية بالتفصيل:</p>

<table>
  <thead>
    <tr>
      <th>القناة التسويقية</th>
      <th>طريقة الدفع</th>
      <th>ماذا يحدث عند التوقف عن الدفع؟</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>الإعلانات الممولة</strong></td>
      <td>ميزانية يومية مستمرة ومُكلفة</td>
      <td>تتوقف الرسائل وينقطع وصول العملاء تماماً.</td>
    </tr>
    <tr>
      <td><strong>الموقع الإلكتروني الاحترافي</strong></td>
      <td>تكلفة بناء تُدفع لمرة واحدة</td>
      <td>يستمر في جلب العملاء لسنوات قادمة.</td>
    </tr>
  </tbody>
</table>

<p>هذا لا يعني أن تتوقف عن إطلاق الإعلانات، بل على العكس؛ فالموقع الإلكتروني يزيد من نجاح إعلاناتك، لأن العميل عندما يزوره يثق بك ويتخذ قرار الشراء بشكل أسرع، وبذلك لا تضيع ميزانيتك الإعلانية سدىً. إذا كنت ترغب في معرفة التكلفة الفعلية، ننصحك بقراءة <a href='/ar/guides/website-cost-in-egypt'>دليل تكلفة المواقع الإلكترونية في مصر (${CURRENT_YEAR})</a>.</p>`,
  },
  readingMinutes: { en: 4, ar: 3 },
  chatTrigger: {
    topic:
      "Whether a business actually needs a website; whether social media (Instagram, Facebook) is enough on its own.",
    arabicExamples: ["هل شركتي محتاجة موقع", "هل السوشيال ميديا تكفي", "ليه محتاج موقع"],
  },
};

export default resource;  