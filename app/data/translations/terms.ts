import { SITE_NAME } from "@/app/constants";
import type { LegalDocument } from "./legal";

const termsOfService: LegalDocument = {
  heading: {
    en: "Terms of Service",
    ar: "شروط الخدمة",
  },
  subheading: {
    en: "Last Updated: August 20, 2026. Please read these terms and conditions carefully before using Our Service.",
    ar: "آخر تحديث: 20 أغسطس 2026. يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام خدمتنا.",
  },
  sections: [
    {
      title: {
        en: "1. Agreement to Terms",
        ar: "1. الموافقة على الشروط",
      },
      content: {
        en: "By accessing our website and utilizing our services, you agree to be bound by these Terms of Service. If you do not agree with all of these Terms, then you are expressly prohibited from using the Site and must discontinue use immediately.",
        ar: "من خلال الوصول إلى موقعنا الإلكتروني واستخدام خدماتنا، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على جميع هذه الشروط، فيُحظر عليك صراحةً استخدام الموقع ويجب عليك التوقف عن استخدامه على الفور.",
      },
    },
    {
      title: {
        en: "2. Services Provided",
        ar: "2. الخدمات المقدمة",
      },
      content: {
        en: `${SITE_NAME} provides digital services including, but not limited to, web design, development, and branding for various industries. The specific scope, deliverables, timeline, and cost of any project will be outlined in a separate, mutually agreed-upon formal proposal or contract, which supersedes these general terms where they conflict.`,
        ar: `تقدم ${SITE_NAME} خدمات رقمية تشمل، على سبيل المثال لا الحصر، تصميم وتطوير مواقع الويب وبناء الهوية البصرية لمختلف القطاعات. سيتم تحديد النطاق الدقيق والمخرجات والجدول الزمني والتكلفة الخاصة بأي مشروع في عرض أو عقد رسمي منفصل متفق عليه بين الطرفين، ويُقدَّم هذا العرض على هذه الشروط العامة عند أي تعارض بينهما.`,
      },
    },
    {
      title: {
        en: "3. Estimates and Pricing",
        ar: "3. التقديرات والتسعير",
      },
      content: {
        en: "Any starting prices or estimates displayed on our website are strictly for informational purposes and do not constitute a final, binding quote or contract. Actual project costs will be determined after a full consultation and scope review, and will be presented to you in a formal proposal.",
        ar: "أي أسعار ابتدائية أو تقديرات معروضة على موقعنا هي للأغراض الاستعلامية فقط ولا تشكل عرض سعر أو عقدًا نهائيًا وملزمًا. سيتم تحديد تكاليف المشروع الفعلية بعد إجراء استشارة كاملة ومراجعة النطاق، وسيتم تقديمها لك في عرض رسمي.",
      },
    },
    {
      title: {
        en: "4. Payment Terms",
        ar: "4. شروط الدفع",
      },
      content: {
        en: "Projects are billed in three installments:\n\n• 25% deposit is required before any design work begins. This deposit is non-refundable and secures your project slot.\n\n• 50% is due when development work begins, after the design has been approved.\n\n• The remaining 25% is due upon final delivery, before the final website files or credentials are handed over.\n\nWork will not commence until the deposit is received and confirmed. The final deliverables will not be transferred until the remaining balance is paid in full.",
        ar: "تُسدَّد مبالغ المشاريع على ثلاث دفعات:\n\n• دفعة مقدمة بنسبة 25% مطلوبة قبل البدء في أي أعمال تصميم، وهي غير قابلة للاسترداد وتضمن حجز موعد مشروعك.\n\n• 50% تُستحق عند بدء أعمال التطوير، بعد اعتماد التصميم.\n\n• الـ 25% المتبقية تُستحق عند التسليم النهائي، قبل تسليم ملفات الموقع النهائية أو بيانات الوصول.\n\nلن يبدأ العمل إلا بعد استلام الدفعة المقدمة وتأكيدها. ولن يتم تسليم المخرجات النهائية إلا بعد سداد الرصيد المتبقي بالكامل.",
      },
    },
    {
      title: {
        en: "5. Included Deliverables, Revisions, and Post-Launch Support",
        ar: "5. المخرجات المشمولة والتعديلات والدعم بعد الإطلاق",
      },
      content: {
        en: "Unless otherwise stated in your project proposal, every project includes: a custom-built, responsive website; a baseline SEO setup; two rounds of design revisions; the first year of hosting; domain setup; and a 90-day post-launch guarantee, as described below.\n\nRevisions: Two rounds of revisions are included during the design phase, covering changes to layout, visual style, and page structure. Once development has begun, further changes are treated as new revision rounds rather than part of the original design phase. Any revisions beyond the two included, or any revisions requested after the design has been approved, will be quoted separately and added to the project cost.\n\n90-Day Post-Launch Guarantee: For 90 days after your site goes live, we will fix, at no additional cost, any bug or defect where a feature we built does not work as agreed in your project proposal. This guarantee does not cover new features, content changes, changes of scope, issues caused by third-party plugins, apps, or services not provided by us, or issues caused by changes made to the site after launch by you or a third party.\n\nHosting Renewal: The first year of hosting is included in the base package. After that, hosting is billed annually at the rate stated in your project proposal or renewal notice. If the renewal fee is not paid, we will provide reasonable advance notice before suspending or taking the site offline.",
        ar: "ما لم يُنص على خلاف ذلك في عرض مشروعك، يشمل كل مشروع: موقعًا إلكترونيًا مخصصًا ومتجاوبًا، وتهيئة أساسية لمحركات البحث (SEO)، وجولتين من تعديلات التصميم، واستضافة للسنة الأولى، وإعداد النطاق (الدومين)، وضمانًا لمدة 90 يومًا بعد الإطلاق، وفق التفاصيل الموضحة أدناه.\n\nالتعديلات: تشمل الخدمة جولتين من التعديلات خلال مرحلة التصميم، تغطيان التغييرات في التخطيط والطابع البصري وبنية الصفحات. بمجرد بدء مرحلة التطوير، تُعامل أي تغييرات إضافية كجولات تعديل جديدة وليست جزءًا من مرحلة التصميم الأصلية. أي تعديلات تتجاوز الجولتين المشمولتين، أو أي تعديلات تُطلب بعد اعتماد التصميم، سيتم تسعيرها بشكل منفصل وإضافتها إلى تكلفة المشروع.\n\nضمان الـ 90 يومًا بعد الإطلاق: لمدة 90 يومًا بعد إطلاق موقعك، سنقوم بإصلاح أي خلل أو عطل في وظيفة قمنا ببنائها ولا تعمل كما هو متفق عليه في عرض مشروعك، دون أي تكلفة إضافية. لا يشمل هذا الضمان الميزات الجديدة، أو تعديلات المحتوى، أو تغييرات نطاق العمل، أو المشكلات الناتجة عن إضافات أو تطبيقات أو خدمات من أطراف ثالثة لم نقم بتوفيرها، أو المشكلات الناتجة عن تعديلات تُجرى على الموقع بعد الإطلاق من قِبلك أو من طرف ثالث.\n\nتجديد الاستضافة: تشمل الباقة الأساسية استضافة السنة الأولى. بعد ذلك، تُفوتَر الاستضافة سنويًا بالسعر المحدد في عرض مشروعك أو في إشعار التجديد. في حال عدم سداد رسوم التجديد، سنقدم إشعارًا مسبقًا معقولًا قبل تعليق الموقع أو إيقافه.",
      },
    },
    {
      title: {
        en: "6. Refund and Cancellation Policy",
        ar: "6. سياسة الاسترداد والإلغاء",
      },
      content: {
        en: "The 25% deposit is non-refundable under all circumstances, as it compensates for time and resources allocated to your project.\n\nOnce a design has been presented and approved by the client, no refund will be issued for any reason. Approval may be given explicitly (written or verbal confirmation) or implicitly (proceeding to the development phase without objection).\n\nIf you choose to cancel a project after approval of the design, the deposit is forfeited and no further charges will apply, provided development has not yet begun. If development has already commenced, the remaining balance or a pro-rated portion may be owed depending on the work completed, as outlined in the project proposal.",
        ar: "الدفعة المقدمة البالغة 25% غير قابلة للاسترداد في جميع الأحوال، إذ تُعوَّض بها الوقت والموارد المخصصة لمشروعك.\n\nبمجرد تقديم التصميم واعتماده من قِبل العميل، لن يتم إصدار أي استرداد لأي سبب كان. قد يكون الاعتماد صريحًا (تأكيد كتابي أو شفهي) أو ضمنيًا (الانتقال إلى مرحلة التطوير دون اعتراض).\n\nإذا اخترت إلغاء المشروع بعد اعتماد التصميم، تُصادَر الدفعة المقدمة ولا تُطبَّق أي رسوم إضافية، شريطة ألا يكون التطوير قد بدأ. أما إذا كان التطوير قد بدأ فعلًا، فقد يُستحق سداد الرصيد المتبقي أو جزء منه بحسب العمل المنجز، وفق ما هو محدد في عرض المشروع.",
      },
    },
    {
      title: {
        en: "7. Intellectual Property and Portfolio Rights",
        ar: "7. الملكية الفكرية وحقوق معرض الأعمال",
      },
      content: {
        en: `Upon receipt of full payment, you will own the final digital products and deliverables as outlined in your project contract. Ownership does not transfer until the final balance is paid in full.\n\nUnless a Non-Disclosure Agreement (NDA) is explicitly signed before the commencement of a project, ${SITE_NAME} reserves the right to feature completed projects, screenshots, and case studies in our portfolio and marketing materials.`,
        ar: `عند استلام الدفع الكامل، ستمتلك المنتجات الرقمية النهائية والمخرجات كما هو موضح في عقد مشروعك. لا تنتقل الملكية إلا بعد سداد الرصيد النهائي بالكامل.\n\nما لم يتم توقيع اتفاقية عدم إفشاء (NDA) صراحةً قبل بدء المشروع، تحتفظ ${SITE_NAME} بالحق في عرض المشاريع المكتملة ولقطات الشاشة ودراسات الحالة في معرض أعمالها ومواد التسويق.`,
      },
    },
    {
      title: {
        en: "8. User Representations",
        ar: "8. إقرارات المستخدم",
      },
      content: {
        en: "By using the Site, you represent and warrant that all registration or inquiry information you submit will be true, accurate, current, and complete. You agree that you will not use the Site for any illegal or unauthorized purpose, and you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.",
        ar: "باستخدامك للموقع، فإنك تقر وتضمن أن جميع معلومات التسجيل أو الاستفسار التي تقدمها ستكون صحيحة ودقيقة وحديثة وكاملة. توافق على أنك لن تستخدم الموقع لأي غرض غير قانوني أو غير مصرح به، ولن تصل إلى الموقع من خلال وسائل آلية أو غير بشرية.",
      },
    },
    {
      title: {
        en: "9. Limitation of Liability",
        ar: "9. حدود المسؤولية",
      },
      content: {
        en: `In no event will ${SITE_NAME}, or our directors, employees, or agents, be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the site or our services, even if we have been advised of the possibility of such damages.`,
        ar: `لن تتحمل ${SITE_NAME} بأي حال من الأحوال، ولا مديرونا أو موظفونا أو وكلاؤنا، المسؤولية تجاهك أو تجاه أي طرف ثالث عن أي أضرار مباشرة أو غير مباشرة أو تبعية أو تأديبية أو عرضية أو خاصة أو جزائية تنشأ عن استخدامك للموقع أو خدماتنا، حتى لو تم إبلاغنا باحتمالية حدوث مثل هذه الأضرار.`,
      },
    },
    {
      title: {
        en: "10. Governing Law and Jurisdiction",
        ar: "10. القانون الحاكم والاختصاص القضائي",
      },
      content: {
        en: "These Terms are governed by the laws of the Arab Republic of Egypt. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts of Cairo, Egypt.",
        ar: "تخضع هذه الشروط لقوانين جمهورية مصر العربية. تختص محاكم القاهرة المصرية المختصة حصريًا بالنظر في أي نزاعات تنشأ عن هذه الشروط أو تتعلق بها.",
      },
    },
  ],
};

export default termsOfService;
