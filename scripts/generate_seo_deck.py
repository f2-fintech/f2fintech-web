import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def build_presentation(output_path):
    prs = Presentation()
    # 16:9 Widescreen slides
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Colors
    c_navy = RGBColor(15, 23, 42)        # #0f172a
    c_card_bg = RGBColor(30, 41, 59)     # #1e293b
    c_blue = RGBColor(50, 68, 230)       # #3244e6
    c_cyan = RGBColor(6, 182, 212)       # #06b6d4
    c_white = RGBColor(255, 255, 255)
    c_gray = RGBColor(148, 163, 184)     # #94a3b8
    c_light_gray = RGBColor(203, 213, 225)
    c_border = RGBColor(51, 65, 85)

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = c_navy
        bg.line.fill.background()
        return bg

    def add_header(slide, badge_text, title_text, subtitle_text):
        # Badge
        badge_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(8), Inches(0.4))
        tf = badge_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = "F2 FINTECH • " + badge_text.upper()
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = c_cyan

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.5), Inches(0.7))
        tf2 = title_box.text_frame
        tf2.word_wrap = True
        p2 = tf2.paragraphs[0]
        p2.text = title_text
        p2.font.size = Pt(24)
        p2.font.bold = True
        p2.font.color.rgb = c_white

        # Subtitle
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.5), Inches(0.5))
        tf3 = sub_box.text_frame
        tf3.word_wrap = True
        p3 = tf3.paragraphs[0]
        p3.text = subtitle_text
        p3.font.size = Pt(13)
        p3.font.color.rgb = c_gray

    def add_card(slide, left, top, width, height, title, items, tag=""):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = c_card_bg
        card.line.color.rgb = c_border
        card.line.width = Pt(1)

        tb = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), width - Inches(0.4), height - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True

        if tag:
            p_tag = tf.paragraphs[0]
            p_tag.text = tag.upper()
            p_tag.font.size = Pt(9)
            p_tag.font.bold = True
            p_tag.font.color.rgb = c_cyan
            p_title = tf.add_paragraph()
        else:
            p_title = tf.paragraphs[0]

        p_title.text = title
        p_title.font.size = Pt(14)
        p_title.font.bold = True
        p_title.font.color.rgb = c_white
        p_title.space_after = Pt(8)

        for item in items:
            p_item = tf.add_paragraph()
            p_item.text = "•  " + item
            p_item.font.size = Pt(11)
            p_item.font.color.rgb = c_light_gray
            p_item.space_after = Pt(4)

    # ==================== SLIDE 1: COVER ====================
    slide1 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide1)

    # Accent pill
    pill = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(1.2), Inches(3.2), Inches(0.4))
    pill.fill.solid()
    pill.fill.fore_color.rgb = c_blue
    pill.line.fill.background()
    tf_pill = pill.text_frame
    p_pill = tf_pill.paragraphs[0]
    p_pill.text = "OFFICIAL SEO STRATEGY & AUDIT"
    p_pill.font.size = Pt(10)
    p_pill.font.bold = True
    p_pill.alignment = PP_ALIGN.CENTER
    p_pill.font.color.rgb = c_white

    # Title
    tbox = slide1.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.0), Inches(1.8))
    tf_t = tbox.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = "F2 Fintech Organic Dominance:\nFull Technical SEO, Schema & Growth Masterplan"
    p_t.font.size = Pt(36)
    p_t.font.bold = True
    p_t.font.color.rgb = c_white

    # Subtitle
    sbox = slide1.shapes.add_textbox(Inches(1.0), Inches(3.8), Inches(10.5), Inches(0.8))
    tf_s = sbox.text_frame
    tf_s.word_wrap = True
    p_s = tf_s.paragraphs[0]
    p_s.text = "Comprehensive technical architecture, route-level metadata mapping, intent-driven keyword targeting, and schema rich-snippet roadmap to scale qualified loan inquiries across India."
    p_s.font.size = Pt(14)
    p_s.font.color.rgb = c_gray

    # 3 Stat Cards on Cover
    stat_data = [
        ("TARGET FOCUS", "Doctor, MSME & Salaried Loans", "High-intent professional borrowers"),
        ("TECH ARCHITECTURE", "React SPA + Dynamic Helmet", "100% crawlable route metadata"),
        ("RICH RESULTS", "5 Core JSON-LD Schemas", "FAQs, Products, HowTo & Breadcrumbs")
    ]
    for i, (head, val, desc) in enumerate(stat_data):
        sc = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0 + i * 3.8), Inches(4.9), Inches(3.5), Inches(1.6))
        sc.fill.solid()
        sc.fill.fore_color.rgb = c_card_bg
        sc.line.color.rgb = c_border
        tf_sc = sc.text_frame
        tf_sc.word_wrap = True
        p1 = tf_sc.paragraphs[0]
        p1.text = head
        p1.font.size = Pt(10)
        p1.font.bold = True
        p1.font.color.rgb = c_cyan
        p2 = tf_sc.add_paragraph()
        p2.text = val
        p2.font.size = Pt(14)
        p2.font.bold = True
        p2.font.color.rgb = c_white
        p3 = tf_sc.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(10)
        p3.font.color.rgb = c_gray

    # ==================== SLIDE 2: TECHNICAL SEO ARCHITECTURE ====================
    slide2 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide2)
    add_header(slide2, "TECHNICAL FOUNDATION", "Single Page Application (SPA) SEO Engine", "How F2 Fintech resolves the indexing challenges of client-side React rendering.")

    add_card(slide2, Inches(0.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "Dynamic Helmet Orchestration", [
                 "React-helmet-async manages DOM head tags on client navigation without page reload.",
                 "Normalized trailing slashes across all routes preventing duplicate content penalties.",
                 "Dynamic document title and meta description injection per route.",
                 "Automatic blog slug generation for programmatic long-tail pages."
             ], "HYDRATION & DOM")

    add_card(slide2, Inches(4.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "Pre-Hydration Fallbacks (index.html)", [
                 "Search bots that do not execute JS immediately see full fallback tags in index.html.",
                 "Static canonical link pointing to authoritative HTTPS origin.",
                 "Embedded FinancialService JSON-LD Schema on initial HTML load.",
                 "Preloaded critical LCP banners & self-hosted Google fonts."
             ], "INSTANT CRAWL")

    add_card(slide2, Inches(8.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "Crawling & Security (robots.txt)", [
                 "Allowed: High-value transactional and educational routes (/doctor-loan, /msme-loan).",
                 "Disallowed: Private utility paths (/login, /profile, /chatbot, /loan-tracker).",
                 "Crawl-Delay: 1s to prevent server overload and 5xx crawl drops.",
                 "Direct sitemap declaration pointing to https://f2fintech.com/sitemap.xml."
             ], "BOT ACCESS")

    # ==================== SLIDE 3: KEYWORD TARGETING MATRIX ====================
    slide3 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide3)
    add_header(slide3, "SEARCH INTENT & KEYWORDS", "High-Converting Financial Keyword Matrix", "Mapping commercial and informational search intent to loan products.")

    add_card(slide3, Inches(0.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "Doctor & Medical Loans", [
                 "'doctor loan for MBBS India' (High volume, high ticket)",
                 "'clinic setup loan for doctors India'",
                 "'dental clinic equipment loan 100% financing'",
                 "'collateral free doctor loan India'",
                 "Audience: Fresh MBBS, BDS, MD, Clinic owners seeking Capex."
             ], "TIER 1 • HEALTHCARE")

    add_card(slide3, Inches(4.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "MSME & Business Finance", [
                 "'business loan without collateral India'",
                 "'MSME loan without collateral 50 lakh'",
                 "'unsecured business loan 2026'",
                 "'working capital loan vs term loan India'",
                 "Audience: Small enterprises, GST registered traders, Manufacturers."
             ], "TIER 2 • BUSINESS")

    add_card(slide3, Inches(8.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "Salaried, CAs & Retail", [
                 "'personal loan for chartered accountant India'",
                 "'home loan balance transfer lowest rate 2026'",
                 "'same day personal loan salaried India'",
                 "'check CIBIL score free India'",
                 "Audience: Salaried professionals & professionals seeking balance transfer."
             ], "TIER 3 • CONSUMER")

    # ==================== SLIDE 4: STRUCTURED DATA & SCHEMAS ====================
    slide4 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide4)
    add_header(slide4, "RICH RESULTS & SCHEMA MARKUP", "JSON-LD Structured Data Implementation", "Transforming plain search listings into visual, interactive SERP snippets.")

    add_card(slide4, Inches(0.8), Inches(2.1), Inches(5.6), Inches(2.3),
             "FAQPage Schema", [
                 "Directly powers Google expandable accordion questions in SERPs.",
                 "Pre-answers: 'What is F2 Fintech?', 'What loans are offered?', and 'Eligibility rules'.",
                 "Drives high CTR and occupies 2x the standard SERP visual space."
             ], "ACCORDIONS")

    add_card(slide4, Inches(6.8), Inches(2.1), Inches(5.6), Inches(2.3),
             "FinancialProduct Schema", [
                 "Specifies lowPrice (9.75%) and highPrice (14.0%) interest boundaries.",
                 "Highlights 100% equipment financing and OD limits for doctor loans.",
                 "Provides algorithmic clarity to Google Knowledge Graph."
             ], "RATES & TERMS")

    add_card(slide4, Inches(0.8), Inches(4.6), Inches(5.6), Inches(2.3),
             "HowTo Schema (Application Journey)", [
                 "Step-by-step guidance: 1. Compare Lenders -> 2. Submit KYC -> 3. Disbursal.",
                 "Eligible for Google rich snippet cards on mobile devices.",
                 "Builds immediate borrower trust before clicking."
             ], "STEP-BY-STEP")

    add_card(slide4, Inches(6.8), Inches(4.6), Inches(5.6), Inches(2.3),
             "BreadcrumbList & Organization Schema", [
                 "Establishes clean site hierarchy: Home > Loans > Doctor Loan.",
                 "Defines F2 Fintech Private Limited as authoritative financial service in Noida / NCR.",
                 "Embeds logo, address, coordinates, and support contacts."
             ], "TRUST & CITATIONS")

    # ==================== SLIDE 5: ON-PAGE OPTIMIZATION & WEB VITALS ====================
    slide5 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide5)
    add_header(slide5, "ON-PAGE & CORE WEB VITALS", "Speed, Accessibility & On-Page Signals", "Ensuring sub-2s load speeds and flawless mobile ranking performance.")

    add_card(slide5, Inches(0.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "Core Web Vitals Strategy", [
                 "LCP Optimization: Preload hero banner webp images with high fetchpriority.",
                 "CLS Prevention: Defined image aspect ratios and overflow clipping.",
                 "FID/INP: Lean JavaScript bundles split via Vite code-splitting and dynamic imports.",
                 "Self-hosted typography: WOFF2 fonts eliminating render-blocking third-party calls."
             ], "SPEED & VITALS")

    add_card(slide5, Inches(4.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "Heading & Semantic Hierarchy", [
                 "Single H1 per page: Hidden accessible H1s ensuring compliant keyword density.",
                 "Clear H2/H3 semantic nesting for loan benefits, eligibility, and EMI calculators.",
                 "Descriptive ALT text across lender bank logos and interactive infographics.",
                 "Internal deep-linking between loan calculators and application forms."
             ], "ON-PAGE ANATOMY")

    add_card(slide5, Inches(8.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "Mobile-First & PWA", [
                 "Responsive Material UI layout with thumb-friendly CTA buttons.",
                 "PWA web manifest and touch icons for direct home-screen app installs.",
                 "Touch-optimized sliders for loan amount and tenure customization.",
                 "Zero horizontal overflow (overflow-x: clip) across all mobile viewports."
             ], "MOBILE INDEXING")

    # ==================== SLIDE 6: 90-DAY STRATEGIC ROADMAP ====================
    slide6 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide6)
    add_header(slide6, "GROWTH ROADMAP", "90-Day Organic Dominance Action Plan", "Execution phases to reach top 3 rankings on high-intent lending searches.")

    add_card(slide6, Inches(0.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "Month 1: Technical & Crawl Fixes", [
                 "Verify all 1,200+ sitemap URLs in Google Search Console.",
                 "Fix any 'Crawled - Currently Not Indexed' via rich internal links.",
                 "Validate all JSON-LD schemas using Google Rich Results Tool.",
                 "Audit 404 redirects and canonical trailing slash consistency."
             ], "PHASE 1 • FOUNDATION")

    add_card(slide6, Inches(4.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "Month 2: Content Hub & Cities", [
                 "Launch programmatic city pages (e.g., 'Doctor Loan in Delhi NCR, Mumbai').",
                 "Publish 15+ comprehensive guides on doctor clinic finance & MSME subsidies.",
                 "Implement interactive EMI calculators with structured calculator schema.",
                 "Embed video customer testimonials with VideoObject schema."
             ], "PHASE 2 • AUTHORITY")

    add_card(slide6, Inches(8.8), Inches(2.1), Inches(3.6), Inches(4.8), 
             "Month 3: Backlinks & Scale", [
                 "Secure high-authority citations from partner NBFCs and fintech portals.",
                 "Conduct Digital PR around doctor loan approval speed benchmarks.",
                 "Monitor keyword movements weekly on GSC and Ahrefs/Semrush.",
                 "A/B test SERP meta descriptions to boost organic Click-Through Rate (CTR)."
             ], "PHASE 3 • DOMINANCE")

    prs.save(output_path)
    print(f"Successfully generated PPTX: {output_path}")

if __name__ == "__main__":
    out_dir = os.path.join(os.getcwd(), "public", "PPT")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "F2Fintech_SEO_Master_Strategy_Deck.pptx")
    build_presentation(out_file)
