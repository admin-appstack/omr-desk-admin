from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import Flowable

# Color palette
PRIMARY = HexColor('#1a237e')       # Deep indigo
SECONDARY = HexColor('#283593')     # Indigo
ACCENT = HexColor('#3949ab')        # Medium indigo
LIGHT_BG = HexColor('#e8eaf6')     # Very light indigo
GREEN = HexColor('#2e7d32')
AMBER = HexColor('#e65100')
DARK_TEXT = HexColor('#212121')
GRAY = HexColor('#757575')
LIGHT_GRAY = HexColor('#f5f5f5')
BORDER = HexColor('#c5cae9')
TEAL = HexColor('#00695c')

W, H = A4

def make_styles():
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle('DocTitle',
        fontName='Helvetica-Bold', fontSize=28, textColor=white,
        spaceAfter=6, leading=34, alignment=TA_LEFT))

    styles.add(ParagraphStyle('DocSubtitle',
        fontName='Helvetica', fontSize=13, textColor=HexColor('#c5cae9'),
        spaceAfter=0, leading=18, alignment=TA_LEFT))

    styles.add(ParagraphStyle('SectionHeading',
        fontName='Helvetica-Bold', fontSize=15, textColor=PRIMARY,
        spaceBefore=18, spaceAfter=8, leading=20,
        borderPad=0))

    styles.add(ParagraphStyle('SubHeading',
        fontName='Helvetica-Bold', fontSize=12, textColor=SECONDARY,
        spaceBefore=10, spaceAfter=5, leading=16))

    styles.add(ParagraphStyle('Body',
        fontName='Helvetica', fontSize=10, textColor=DARK_TEXT,
        spaceAfter=5, leading=15))

    styles.add(ParagraphStyle('BulletItem',
        fontName='Helvetica', fontSize=10, textColor=DARK_TEXT,
        spaceAfter=3, leading=14, leftIndent=15, bulletIndent=5))

    styles.add(ParagraphStyle('Label',
        fontName='Helvetica-Bold', fontSize=9, textColor=GRAY,
        spaceAfter=2, leading=12))

    styles.add(ParagraphStyle('SmallBody',
        fontName='Helvetica', fontSize=9, textColor=DARK_TEXT,
        spaceAfter=3, leading=13))

    styles.add(ParagraphStyle('Caption',
        fontName='Helvetica-Oblique', fontSize=9, textColor=GRAY,
        spaceAfter=4, alignment=TA_CENTER))

    styles.add(ParagraphStyle('TagLine',
        fontName='Helvetica-Bold', fontSize=11, textColor=TEAL,
        spaceAfter=6, leading=16))

    return styles


class ColorBlock(Flowable):
    def __init__(self, width, height, color, radius=4):
        Flowable.__init__(self)
        self.width = width
        self.height = height
        self.color = color
        self.radius = radius

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.roundRect(0, 0, self.width, self.height, self.radius, fill=1, stroke=0)


class HeaderBanner(Flowable):
    def __init__(self, width):
        Flowable.__init__(self)
        self.width = width
        self.height = 120

    def draw(self):
        c = self.canv
        # Background gradient-like blocks
        c.setFillColor(PRIMARY)
        c.rect(0, 0, self.width, self.height, fill=1, stroke=0)
        # Accent stripe
        c.setFillColor(ACCENT)
        c.rect(0, 0, self.width, 8, fill=1, stroke=0)
        # Decorative circle
        c.setFillColor(HexColor('#3949ab'))
        c.circle(self.width - 40, 80, 60, fill=1, stroke=0)
        c.setFillColor(HexColor('#283593'))
        c.circle(self.width - 20, 40, 35, fill=1, stroke=0)

        # AppStack logo and Prepared by
        import os
        logo_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "appstack_logo.png")
        if os.path.exists(logo_path):
            c.drawImage(logo_path, self.width - 140, 85, width=30, height=30,
                        preserveAspectRatio=True, mask="auto")
        
        c.setFillColor(HexColor('#c5cae9'))
        c.setFont("Helvetica", 9)
        c.drawString(self.width - 105, 105, "Prepared by:")
        c.setFillColor(HexColor('#ffffff'))
        c.setFont("Helvetica-Bold", 11)
        c.drawString(self.width - 105, 92, "AppStack.co.in")


def bullet(text, styles):
    return Paragraph(f'<bullet>\u2022</bullet> {text}', styles['BulletItem'])


def check(text, styles):
    return Paragraph(f'<bullet><font color="#2e7d32">\u2713</font></bullet> {text}', styles['BulletItem'])


def warn(text, styles):
    return Paragraph(f'<bullet><font color="#e65100">\u26a0</font></bullet> {text}', styles['BulletItem'])


def info_card(title, items, styles, color=LIGHT_BG, title_color=PRIMARY):
    """A shaded card with title and bullet list."""
    inner = [Paragraph(f'<b><font color="{title_color.hexval() if hasattr(title_color,"hexval") else "#1a237e"}">{title}</font></b>', styles['SubHeading'])]
    for item in items:
        inner.append(bullet(item, styles))
    t = Table([[inner]], colWidths=[W - 80*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), color),
        ('ROUNDEDCORNERS', [5]),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    return t


def two_col_card(left_title, left_items, right_title, right_items, styles):
    cw = (W - 85*mm) / 2
    def col(title, items, bg):
        content = [Paragraph(f'<b><font color="#1a237e">{title}</font></b>', styles['SubHeading'])]
        for i in items:
            content.append(bullet(i, styles))
        return content

    left = col(left_title, left_items, LIGHT_BG)
    right = col(right_title, right_items, HexColor('#e8f5e9'))

    t = Table([[left, right]], colWidths=[cw, cw])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,-1), LIGHT_BG),
        ('BACKGROUND', (1,0), (1,-1), HexColor('#e8f5e9')),
        ('BOX', (0,0), (0,-1), 0.5, BORDER),
        ('BOX', (1,0), (1,-1), 0.5, HexColor('#a5d6a7')),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('COLUMNPADDING', (0,0), (-1,-1), 6),
    ]))
    return t


def pricing_table(plans, styles):
    header = [Paragraph('<b><font color="white">Plan</font></b>', styles['Label']),
              Paragraph('<b><font color="white">Price</font></b>', styles['Label']),
              Paragraph('<b><font color="white">Features</font></b>', styles['Label'])]

    rows = [header]
    colors_list = [HexColor('#43a047'), HexColor('#1e88e5'), HexColor('#e53935')]
    for i, (name, price, feats) in enumerate(plans):
        feat_text = ' \u2022 '.join(feats)
        rows.append([
            Paragraph(f'<b>{name}</b>', styles['Body']),
            Paragraph(f'<b>{price}</b>', styles['Body']),
            Paragraph(feat_text, styles['SmallBody']),
        ])

    cw = [35*mm, 35*mm, W - 155*mm]
    t = Table(rows, colWidths=cw)
    style = [
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [white, LIGHT_BG]),
    ]
    for i, (_, _, _) in enumerate(plans):
        style.append(('TEXTCOLOR', (0, i+1), (0, i+1), colors_list[i]))
        style.append(('FONTNAME', (0, i+1), (0, i+1), 'Helvetica-Bold'))
    t.setStyle(TableStyle(style))
    return t


def phase_table(phases, styles):
    rows = []
    bg_colors = [HexColor('#e3f2fd'), HexColor('#e8f5e9'), HexColor('#fff3e0')]
    for i, (phase, days, tasks) in enumerate(phases):
        task_text = '<br/>'.join([f'\u2022 {t}' for t in tasks])
        rows.append([
            Paragraph(f'<b>{phase}</b>', styles['Body']),
            Paragraph(days, styles['Body']),
            Paragraph(task_text, styles['SmallBody']),
        ])
    cw = [35*mm, 30*mm, W - 140*mm]
    t = Table(rows, colWidths=cw)
    t.setStyle(TableStyle([
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (0,-1), LIGHT_BG),
        ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
        ('ROWBACKGROUNDS', (1,0), (-1,-1), [white, LIGHT_BG]),
    ]))
    return t


def comp_table(styles):
    header = ['Feature', 'Competitors', 'Your Platform']
    rows_data = [
        ['OMR Scanning', 'Yes (desktop)', 'Yes (mobile + web)'],
        ['Online Tests', 'Partial', 'Yes'],
        ['Auto Website/CMS', 'No', 'Yes'],
        ['Result Publishing', 'Partial', 'Yes (instant)'],
        ['Test Paper PDF', 'Rare', 'Yes'],
        ['Payment Integration', 'No', 'Yes'],
        ['All-in-One Bundle', 'No', 'Yes'],
        ['India Tier 2/3 Focus', 'No', 'Yes'],
    ]
    rows = [[Paragraph(f'<b>{h}</b>', styles['Label']) for h in header]]
    for r in rows_data:
        rows.append([Paragraph(r[0], styles['SmallBody']),
                     Paragraph(r[1], styles['SmallBody']),
                     Paragraph(f'<font color="#2e7d32"><b>{r[2]}</b></font>', styles['SmallBody'])])

    cw = [55*mm, 45*mm, 45*mm]
    t = Table(rows, colWidths=cw)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [white, LIGHT_BG]),
    ]))
    return t


def build_pdf(path):
    doc = SimpleDocTemplate(
        path, pagesize=A4,
        leftMargin=20*mm, rightMargin=20*mm,
        topMargin=15*mm, bottomMargin=20*mm
    )
    styles = make_styles()
    story = []

    # ── COVER PAGE ─────────────────────────────────────────────────────────────
    story.append(HeaderBanner(W - 40*mm))
    story.append(Spacer(1, -120))

    cover_title = Table([[
        Paragraph('EduScan Pro', styles['DocTitle']),
    ]], colWidths=[W - 40*mm])
    cover_title.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 30),
        ('LEFTPADDING', (0,0), (-1,-1), 20),
        ('RIGHTPADDING', (0,0), (-1,-1), 20),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(cover_title)

    cover_sub = Table([[
        Paragraph('All-in-One Test &amp; Coaching Management SaaS Platform', styles['DocSubtitle']),
    ]], colWidths=[W - 40*mm])
    cover_sub.setStyle(TableStyle([
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 20),
        ('RIGHTPADDING', (0,0), (-1,-1), 20),
        ('BOTTOMPADDING', (0,0), (-1,-1), 20),
    ]))
    story.append(cover_sub)

    story.append(Spacer(1, 10*mm))

    # One-liner
    tagline_tbl = Table([[
        Paragraph('"Subscribe Once \u2192 Get OMR System + Website + Result Portal + Online Tests"',
                  styles['TagLine']),
    ]], colWidths=[W - 40*mm])
    tagline_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_BG),
        ('BOX', (0,0), (-1,-1), 1.5, ACCENT),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 14),
        ('RIGHTPADDING', (0,0), (-1,-1), 14),
    ]))
    story.append(tagline_tbl)
    story.append(Spacer(1, 8*mm))

    # Key stats row
    stats = [
        ('Target Market', 'India Tier 2/3 Cities'),
        ('Primary Customers', 'Coaching Institutes & Schools'),
        ('Revenue Potential', 'Rs. 50K\u2013Rs. 5L/month'),
        ('Model', 'B2B SaaS Subscription'),
    ]
    stat_cells = []
    for label, value in stats:
        stat_cells.append([
            Paragraph(label, styles['Label']),
            Paragraph(f'<b>{value}</b>', styles['Body']),
        ])

    # Stats cards
    stats_row = []
    for label, value in stats:
        cell = Table([
            [Paragraph(label, styles['Label'])],
            [Paragraph(f'<b>{value}</b>', styles['SmallBody'])],
        ], colWidths=[(W-40*mm)/4 - 4*mm])
        cell.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), LIGHT_BG),
            ('BOX', (0,0), (-1,-1), 0.5, BORDER),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        stats_row.append(cell)

    stats_tbl = Table([stats_row], colWidths=[(W-40*mm)/4]*4, hAlign='LEFT')
    stats_tbl.setStyle(TableStyle([
        ('LEFTPADDING', (0,0), (-1,-1), 2),
        ('RIGHTPADDING', (0,0), (-1,-1), 2),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(stats_tbl)
    story.append(Spacer(1, 6*mm))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER))
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph('Product Documentation \u2022 Business Blueprint \u2022 v1.0 \u2022 2025', styles['Caption']))

    story.append(PageBreak())

    # ── TABLE OF CONTENTS ──────────────────────────────────────────────────────
    story.append(Paragraph('Table of Contents', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 4*mm))

    toc_items = [
        ('1.', 'Executive Summary', '3'),
        ('2.', 'Problem Statement', '3'),
        ('3.', 'Product Vision & Core Concept', '4'),
        ('4.', 'Complete Product Modules', '4'),
        ('5.', 'End-to-End Workflow', '6'),
        ('6.', 'Technology Stack', '6'),
        ('7.', 'Database Architecture', '7'),
        ('8.', 'Business Model & Pricing', '7'),
        ('9.', 'Competitive Advantage', '8'),
        ('10.', 'Go-To-Market Strategy', '8'),
        ('11.', 'MVP Roadmap (45 Days)', '9'),
        ('12.', 'Revenue Potential', '9'),
        ('13.', 'Risks & Mitigation', '9'),
        ('14.', 'Long-Term Vision', '10'),
    ]

    toc_rows = []
    for num, title, page in toc_items:
        toc_rows.append([
            Paragraph(f'<b>{num}</b>', styles['SmallBody']),
            Paragraph(title, styles['SmallBody']),
            Paragraph(page, styles['SmallBody']),
        ])

    toc_tbl = Table(toc_rows, colWidths=[12*mm, W-75*mm, 15*mm])
    toc_tbl.setStyle(TableStyle([
        ('FONTSIZE', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('ALIGN', (2,0), (2,-1), 'RIGHT'),
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [white, LIGHT_BG]),
        ('LINEBELOW', (0,0), (-1,-1), 0.3, BORDER),
        ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0,0), (0,-1), PRIMARY),
    ]))
    story.append(toc_tbl)
    story.append(PageBreak())

    # ── SECTION 1: EXECUTIVE SUMMARY ──────────────────────────────────────────
    story.append(Paragraph('1. Executive Summary', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    story.append(Paragraph(
        'EduScan Pro is a complete B2B SaaS platform designed for coaching institutes and schools across India. '
        'It eliminates the fragmented, expensive, and manual processes coaching centres face today by combining '
        'OMR scanning, online/offline test management, question bank, PDF generation, result publishing, '
        'and an auto-generated website — all under one subscription.',
        styles['Body']))
    story.append(Spacer(1, 3*mm))

    exec_items = [
        ('Practical', 'Solves a real, daily pain point for thousands of institutes'),
        ('Monetizable', 'Clear subscription tiers; scalable recurring revenue'),
        ('Scalable', 'Multi-tenant SaaS — one backend serves unlimited institutes'),
        ('Defensible', 'Deep lock-in once institute depends on the platform'),
        ('Timing', 'India EdTech market growing rapidly; Tier 2/3 cities underserved'),
    ]
    for badge, desc in exec_items:
        story.append(Paragraph(
            f'<font color="#1a237e"><b>{badge}:</b></font> {desc}', styles['BulletItem']))
    story.append(Spacer(1, 5*mm))

    # ── SECTION 2: PROBLEM STATEMENT ──────────────────────────────────────────
    story.append(Paragraph('2. Problem Statement', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    probs = Table([[
        Table([
            [Paragraph('<b>Current Pain Points</b>', styles['SubHeading'])],
            [bullet('Manual OMR checking is time-consuming and error-prone', styles)],
            [bullet('Existing OMR machines are expensive and hardware-dependent', styles)],
            [bullet('No affordable all-in-one solution for small institutes', styles)],
            [bullet('Most coaching centres lack a professional website', styles)],
            [bullet('Result publishing is manual (WhatsApp, notice board)', styles)],
            [bullet('Test paper creation requires separate tools', styles)],
        ], colWidths=[75*mm]),
        Table([
            [Paragraph('<b>Market Gap</b>', styles['SubHeading'])],
            [bullet('Competitors (SpeedExam, Addmen) are desktop-based, expensive, not SaaS', styles)],
            [bullet('Testbook/Embibe focus on students, not institutes (B2C, not B2B)', styles)],
            [bullet('No single product covers: OMR + Online Test + Website + Results', styles)],
            [bullet('Tier 2/3 cities largely ignored by existing EdTech platforms', styles)],
            [bullet('Institutes want one bill, one login, one system', styles)],
        ], colWidths=[75*mm]),
    ]], colWidths=[80*mm, 80*mm])
    probs.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,-1), LIGHT_BG),
        ('BACKGROUND', (1,0), (1,-1), HexColor('#fce4ec')),
        ('BOX', (0,0), (0,-1), 0.5, BORDER),
        ('BOX', (1,0), (1,-1), 0.5, HexColor('#f48fb1')),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('COLUMNPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(probs)
    story.append(PageBreak())

    # ── SECTION 3: PRODUCT VISION ──────────────────────────────────────────────
    story.append(Paragraph('3. Product Vision &amp; Core Concept', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    story.append(Paragraph(
        'Think of EduScan Pro as the <b>"Shopify for Coaching Institutes"</b> or a <b>"Mini ERP for Education Centres"</b>. '
        'When an institute signs up, they instantly receive a complete operational system — no setup, no IT team needed.',
        styles['Body']))
    story.append(Spacer(1, 4*mm))

    what_they_get = [
        'OMR scanning system (mobile camera or image upload)',
        'Admin dashboard to manage students, tests, and results',
        'Auto-generated public website (yourapp.com/institute-name)',
        'Student result portal — enter roll number, see marks & rank',
        'Online test module — students attempt tests from any device',
        'PDF test paper generator with institute branding',
        'Question bank (custom + curated)',
        'Optional payment gateway for paid test series',
    ]
    story.append(Paragraph('<b>What Every Institute Gets on Signup:</b>', styles['SubHeading']))
    for item in what_they_get:
        story.append(check(item, styles))
    story.append(Spacer(1, 5*mm))

    # ── SECTION 4: PRODUCT MODULES ─────────────────────────────────────────────
    story.append(Paragraph('4. Complete Product Modules', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    modules = [
        ('Module 1: Institute Website (Auto CMS)',
         'Each institute gets a ready-made website at yourapp.com/institute-name. '
         'Built from a fixed template; the institute fills editable fields (name, logo, courses, contact). '
         'No coding, no setup — live in minutes.',
         ['Home, About, Courses, Contact, Test Series, Results pages',
          'Template-based (not full CMS — keeps it simple)',
          'Subdomain option: institute.yourapp.com (premium)',
          'Custom domain support: www.abcacademy.com (Pro tier)',
          'Auto-populated from database on signup']),

        ('Module 2: Question Bank System',
         'A structured repository of questions powering both online tests and OMR paper generation.',
         ['Institute creates MCQs with options, correct answer, tags (subject, topic, difficulty)',
          'Phase 2: predefined questions for Physics, Chemistry, Maths, Biology (JEE/NEET/SSC)',
          'Filter by class, topic, difficulty, exam type',
          'Community-contributed questions (Phase 3)']),

        ('Module 3: Test Builder',
         'Institute selects questions, sets duration and marks, and publishes the test.',
         ['Select from question bank or create new questions inline',
          'Set total marks, time limit, negative marking, instructions',
          'Choose test mode: Online or Offline (OMR)',
          'Schedule test window for online exams']),

        ('Module 4: PDF Test Paper Generator',
         'Generates a print-ready exam paper with institute branding.',
         ['Institute logo, name, exam title, date, instructions',
          'Questions formatted cleanly with answer options (A/B/C/D)',
          'Generated using pdfkit / puppeteer (HTML to PDF)',
          'Instant download — print and distribute']),

        ('Module 5: OMR Sheet Generator',
         'Generates a standardised bubble-format answer sheet matched to the test.',
         ['Standard bubble format (A/B/C/D columns)',
          'Roll number field, student name, Test ID / QR code',
          'Consistent format ensures reliable scanning',
          'Keep formats limited initially to reduce OMR detection errors']),

        ('Module 6: OMR Scanning System',
         'Core technical feature — teacher scans filled OMR sheets via mobile or uploads images.',
         ['Upload image or use phone camera (Android-first)',
          'OpenCV: auto-detect sheet alignment, edge detection, bubble detection',
          'Match detected answers against stored answer key',
          'Handle partial fills, overwriting, poor lighting',
          'Accuracy is critical — wrong results kill the product']),

        ('Module 7: Online Test System',
         'Students log in and attempt the test directly on the platform.',
         ['Login via OTP or roll number',
          'Timer-based test with auto-submit on timeout',
          'Question navigation panel + mark for review',
          'Instant result on submission',
          'Basic anti-cheat: timer, fullscreen warning']),

        ('Module 8: Result & Analytics Engine',
         'Unified result system whether the test was online or offline.',
         ['Auto-calculates marks, rank, accuracy per student',
          'Topic-wise and subject-wise performance breakdown',
          'Rank list for the institute',
          'Comparison graphs across tests',
          'Results auto-published to the institute website']),

        ('Module 9: Result Publishing Portal',
         'Students visit the institute website and check their own results.',
         ['Enter roll number — see marks, rank, performance',
          'Visible on yourapp.com/institute-name/results',
          'This is the viral/hook feature — students share links']),

        ('Module 10: Payment System (Optional)',
         'Institutes can monetise their test series.',
         ['Students pay to access a test series',
          'Unlock tests after purchase',
          'Track purchases in admin panel',
          'Revenue multiplier for institutes = retention for you']),
    ]

    mod_colors = [LIGHT_BG, HexColor('#e8f5e9'), HexColor('#fff3e0'), LIGHT_BG, HexColor('#e8f5e9')]
    for i, (title, desc, feats) in enumerate(modules):
        mod_num = i + 1
        color = mod_colors[i % len(mod_colors)]
        inner = [
            Paragraph(f'<b><font color="#1a237e">{title}</font></b>', styles['SubHeading']),
            Paragraph(desc, styles['SmallBody']),
        ]
        for f in feats:
            inner.append(bullet(f, styles))
        t = Table([[inner]], colWidths=[W - 40*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), color),
            ('BOX', (0,0), (-1,-1), 0.5, BORDER),
            ('TOPPADDING', (0,0), (-1,-1), 8),
            ('BOTTOMPADDING', (0,0), (-1,-1), 8),
            ('LEFTPADDING', (0,0), (-1,-1), 12),
            ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ]))
        story.append(KeepTogether([t, Spacer(1, 4*mm)]))

    story.append(PageBreak())

    # ── SECTION 5: END-TO-END WORKFLOW ─────────────────────────────────────────
    story.append(Paragraph('5. End-to-End Workflow', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    flows = Table([[
        Table([
            [Paragraph('<b>Offline Flow (OMR)</b>', styles['SubHeading'])],
            [Paragraph('1. Teacher creates test in admin panel', styles['SmallBody'])],
            [Paragraph('2. System generates PDF paper + OMR sheet', styles['SmallBody'])],
            [Paragraph('3. Print and conduct physical exam', styles['SmallBody'])],
            [Paragraph('4. Teacher scans completed OMR sheets via app', styles['SmallBody'])],
            [Paragraph('5. System evaluates and generates results', styles['SmallBody'])],
            [Paragraph('6. Results auto-published on institute website', styles['SmallBody'])],
        ], colWidths=[75*mm]),
        Table([
            [Paragraph('<b>Online Flow</b>', styles['SubHeading'])],
            [Paragraph('1. Teacher creates test and publishes online', styles['SmallBody'])],
            [Paragraph('2. Students receive link or log in to portal', styles['SmallBody'])],
            [Paragraph('3. Students attempt timed test on any device', styles['SmallBody'])],
            [Paragraph('4. System auto-submits on timeout', styles['SmallBody'])],
            [Paragraph('5. Results generated instantly', styles['SmallBody'])],
            [Paragraph('6. Results visible on institute website', styles['SmallBody'])],
        ], colWidths=[75*mm]),
    ]], colWidths=[80*mm, 80*mm])
    flows.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,-1), LIGHT_BG),
        ('BACKGROUND', (1,0), (1,-1), HexColor('#e8f5e9')),
        ('BOX', (0,0), (0,-1), 0.5, BORDER),
        ('BOX', (1,0), (1,-1), 0.5, HexColor('#a5d6a7')),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('COLUMNPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(flows)
    story.append(Spacer(1, 5*mm))

    # ── SECTION 6: TECH STACK ──────────────────────────────────────────────────
    story.append(Paragraph('6. Technology Stack', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    tech_rows = [
        [Paragraph('<b>Layer</b>', styles['Label']),
         Paragraph('<b>Technology</b>', styles['Label']),
         Paragraph('<b>Purpose</b>', styles['Label'])],
        [Paragraph('Frontend', styles['Body']),
         Paragraph('Angular', styles['Body']),
         Paragraph('Admin panel, student test UI, dynamic institute website routing', styles['SmallBody'])],
        [Paragraph('Backend', styles['Body']),
         Paragraph('Node.js + Sequelize', styles['Body']),
         Paragraph('REST API, test engine, result calculation, submission handling', styles['SmallBody'])],
        [Paragraph('Mobile', styles['Body']),
         Paragraph('Flutter / React Native', styles['Body']),
         Paragraph('OMR camera scanning app (Android-first)', styles['SmallBody'])],
        [Paragraph('Image Processing', styles['Body']),
         Paragraph('OpenCV (Python)', styles['Body']),
         Paragraph('Bubble detection, edge detection, thresholding, contour detection', styles['SmallBody'])],
        [Paragraph('PDF Generation', styles['Body']),
         Paragraph('pdfkit / Puppeteer', styles['Body']),
         Paragraph('Test paper PDF from HTML template with institute branding', styles['SmallBody'])],
        [Paragraph('Database', styles['Body']),
         Paragraph('MySQL / PostgreSQL', styles['Body']),
         Paragraph('Multi-tenant data storage with institute_id on every table', styles['SmallBody'])],
        [Paragraph('Auth', styles['Body']),
         Paragraph('JWT + OTP', styles['Body']),
         Paragraph('Institute admin login; student OTP login for online tests', styles['SmallBody'])],
        [Paragraph('CDN / Storage', styles['Body']),
         Paragraph('AWS S3 / Cloudflare', styles['Body']),
         Paragraph('OMR images, logo files, generated PDFs', styles['SmallBody'])],
    ]

    tech_tbl = Table(tech_rows, colWidths=[35*mm, 40*mm, W-120*mm])
    tech_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [white, LIGHT_BG]),
    ]))
    story.append(tech_tbl)
    story.append(PageBreak())

    # ── SECTION 7: DATABASE ARCHITECTURE ──────────────────────────────────────
    story.append(Paragraph('7. Database Architecture', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    story.append(Paragraph(
        'Multi-tenant SaaS model: single backend, multiple institutes. Every table includes <b>institute_id</b> '
        'to isolate data. URL strategy starts with path-based routing (yourapp.com/institute) for MVP, '
        'upgrading to subdomain (institute.yourapp.com) for Pro users.',
        styles['Body']))
    story.append(Spacer(1, 4*mm))

    db_tables = [
        ('institutes', 'id, name, slug, logo_url, contact, plan, created_at'),
        ('pages', 'id, institute_id, page_type, content_json, updated_at'),
        ('students', 'id, institute_id, name, roll_number, email, phone'),
        ('questions', 'id, institute_id, subject, topic, difficulty, question_text, options_json, correct_answer'),
        ('tests', 'id, institute_id, title, test_mode [online/offline], duration, total_marks, scheduled_at'),
        ('test_questions', 'id, test_id, question_id, order_index, marks'),
        ('omr_scans', 'id, test_id, student_id, image_url, detected_answers_json, scanned_at'),
        ('test_attempts', 'id, test_id, student_id, answers_json, submitted_at [online]'),
        ('results', 'id, test_id, student_id, marks_obtained, rank, accuracy, analysis_json'),
        ('payments', 'id, institute_id, student_id, test_id, amount, status, paid_at'),
    ]

    db_rows = [[Paragraph('<b>Table</b>', styles['Label']), Paragraph('<b>Key Columns</b>', styles['Label'])]]
    for table, cols in db_tables:
        db_rows.append([
            Paragraph(f'<font color="#1a237e"><b>{table}</b></font>', styles['SmallBody']),
            Paragraph(f'<font color="#757575">{cols}</font>', styles['SmallBody']),
        ])

    db_tbl = Table(db_rows, colWidths=[45*mm, W - 100*mm])
    db_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [white, LIGHT_BG]),
    ]))
    story.append(db_tbl)
    story.append(Spacer(1, 5*mm))

    # ── SECTION 8: BUSINESS MODEL ──────────────────────────────────────────────
    story.append(Paragraph('8. Business Model &amp; Pricing', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    story.append(Paragraph('<b>Subscription-Based SaaS (Monthly Billing)</b>', styles['SubHeading']))
    plans = [
        ('Starter', 'Rs. 299/month', ['Website (subdomain)', 'Result publishing', 'Limited tests (5/month)', 'Basic support']),
        ('Standard', 'Rs. 699/month', ['OMR scanning (unlimited)', 'Online tests', 'Analytics dashboard', 'Website + subdomain', 'Email support']),
        ('Pro', 'Rs. 1499/month', ['Custom domain', 'Payment integration', 'Branding removal', 'Premium question bank (Phase 2)', 'Priority support', 'SMS notifications']),
    ]
    story.append(pricing_table(plans, styles))
    story.append(Spacer(1, 4*mm))

    story.append(Paragraph('<b>Add-on Revenue Streams:</b>', styles['SubHeading']))
    addons = [
        'Extra OMR scans beyond plan limit',
        'SMS notification packs',
        'Premium curated question bank subscription',
        'Commission on student payments through the platform',
        'Custom domain setup fee (one-time)',
    ]
    for a in addons:
        story.append(bullet(a, styles))
    story.append(PageBreak())

    # ── SECTION 9: COMPETITIVE ADVANTAGE ──────────────────────────────────────
    story.append(Paragraph('9. Competitive Advantage', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))
    story.append(comp_table(styles))
    story.append(Spacer(1, 4*mm))

    story.append(Paragraph('<b>Strategic Lock-in:</b>', styles['SubHeading']))
    story.append(Paragraph(
        'Once an institute uses your OMR system, publishes results on your website, and shares your '
        'link with students — switching costs become very high. You become their public-facing digital identity.',
        styles['Body']))
    story.append(Spacer(1, 5*mm))

    # ── SECTION 10: GTM STRATEGY ───────────────────────────────────────────────
    story.append(Paragraph('10. Go-To-Market Strategy', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    gtm = [
        ('Step 1: Local Launch',
         ['Visit 5\u201310 nearby coaching institutes personally',
          'Live demo the product (OMR scan + instant result on website)',
          'Offer free 14-day trial with white-glove onboarding']),
        ('Step 2: WhatsApp Marketing',
         ['WhatsApp is the primary communication channel for coaching in India',
          'Create institute-owner groups; share demo videos',
          'Referral discounts: get 1 month free for each institute referred']),
        ('Step 3: Social Media',
         ['Short demo reels on Instagram/YouTube — scan OMR, result live in 10 seconds',
          'Target: coaching institute owners in Tier 2/3 cities',
          'Facebook groups for coaching centre owners']),
        ('Step 4: Referral & Partner Program',
         ['Discounts for referrals',
          'Partner with printing shops (OMR sheet printing)',
          'Partner with local ed-tech resellers']),
    ]
    for step, items in gtm:
        story.append(Paragraph(f'<b><font color="#1a237e">{step}</font></b>', styles['SubHeading']))
        for item in items:
            story.append(bullet(item, styles))
        story.append(Spacer(1, 2*mm))

    story.append(PageBreak())

    # ── SECTION 11: MVP ROADMAP ────────────────────────────────────────────────
    story.append(Paragraph('11. MVP Roadmap (45 Days)', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    phases = [
        ('Phase 1', 'Days 1\u201315',
         ['Institute login and authentication',
          'Question creation interface (MCQ)',
          'Test builder (select questions, set duration/marks)',
          'Basic admin dashboard']),
        ('Phase 2', 'Days 16\u201330',
         ['PDF test paper generation (pdfkit/puppeteer)',
          'OMR sheet generator (standard bubble format)',
          'Basic OMR scanning (image upload + OpenCV)',
          'Result calculation engine']),
        ('Phase 3', 'Days 31\u201345',
         ['Public result page (roll number lookup)',
          'Basic institute website (template + DB content)',
          'Simple online test module (no fancy features)',
          'Deploy MVP and onboard first 3\u20135 institutes']),
    ]
    story.append(phase_table(phases, styles))
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph(
        '<b>Post-MVP (Month 2\u20133):</b> Camera scanning, analytics dashboard, subdomain support, '
        'payment integration, predefined question bank (Phase 2).',
        styles['SmallBody']))
    story.append(Spacer(1, 5*mm))

    # ── SECTION 12: REVENUE POTENTIAL ─────────────────────────────────────────
    story.append(Paragraph('12. Revenue Potential', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    rev_rows = [
        [Paragraph('<b>Scale</b>', styles['Label']),
         Paragraph('<b>Avg Revenue/Institute</b>', styles['Label']),
         Paragraph('<b>Monthly Revenue</b>', styles['Label']),
         Paragraph('<b>Annual Revenue</b>', styles['Label'])],
        [Paragraph('50 Institutes', styles['Body']),
         Paragraph('Rs. 500/mo', styles['Body']),
         Paragraph('Rs. 25,000', styles['Body']),
         Paragraph('Rs. 3,00,000', styles['Body'])],
        [Paragraph('100 Institutes', styles['Body']),
         Paragraph('Rs. 500/mo', styles['Body']),
         Paragraph('Rs. 50,000', styles['Body']),
         Paragraph('Rs. 6,00,000', styles['Body'])],
        [Paragraph('500 Institutes', styles['Body']),
         Paragraph('Rs. 600/mo', styles['Body']),
         Paragraph('Rs. 3,00,000', styles['Body']),
         Paragraph('Rs. 36,00,000', styles['Body'])],
        [Paragraph('1,000 Institutes', styles['Body']),
         Paragraph('Rs. 600/mo', styles['Body']),
         Paragraph('Rs. 6,00,000', styles['Body']),
         Paragraph('Rs. 72,00,000', styles['Body'])],
    ]

    rev_tbl = Table(rev_rows, colWidths=[40*mm, 45*mm, 45*mm, 40*mm])
    rev_tbl.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY),
        ('TEXTCOLOR', (0,0), (-1,0), white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [white, LIGHT_BG]),
        ('FONTNAME', (0,-1), (-1,-1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (2,-1), (3,-1), GREEN),
    ]))
    story.append(rev_tbl)
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph(
        'Note: India has 1M+ coaching institutes. Even 0.1% market share = 1,000 institutes. '
        'Revenue increases further with add-ons and payment commissions.',
        styles['SmallBody']))
    story.append(Spacer(1, 5*mm))

    # ── SECTION 13: RISKS ──────────────────────────────────────────────────────
    story.append(Paragraph('13. Risks &amp; Mitigation', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    risks = [
        ('OMR Accuracy',
         'Wrong results = product failure. Accuracy must be near-perfect.',
         'Strict QA before launch; test with 500+ sheets; manual review flag for low-confidence scans'),
        ('Overbuilding',
         'Building too many features causes delays and scope creep.',
         'Strict MVP discipline: only modules 1\u20135 at launch. Add features based on real user feedback'),
        ('Question Bank Content',
         'Building full JEE/NEET question bank alone is time-consuming and expensive.',
         'Phase 1: institutes create own questions. Phase 2: community-contributed. Phase 3: partner with educators'),
        ('Server Load for Online Tests',
         '200+ students submitting at the same time can crash a poorly designed system.',
         'Efficient Node.js APIs, proper DB indexing, load testing before launch; start with small batches'),
        ('Customisation Requests',
         'Every institute will want "just one more thing" — colour, section, layout changes.',
         'Strict template model. Controlled fields. Extra customisation = extra charge'),
    ]

    for risk, problem, mitigation in risks:
        risk_content = [
            Paragraph(f'<b><font color="#c62828">{risk}</font></b>', styles['SubHeading']),
            Paragraph(f'<b>Risk:</b> {problem}', styles['SmallBody']),
            Paragraph(f'<b>Mitigation:</b> {mitigation}', styles['SmallBody']),
        ]
        t = Table([[risk_content]], colWidths=[W - 40*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), HexColor('#fff8e1')),
            ('BOX', (0,0), (-1,-1), 0.5, HexColor('#ffcc02')),
            ('TOPPADDING', (0,0), (-1,-1), 7),
            ('BOTTOMPADDING', (0,0), (-1,-1), 7),
            ('LEFTPADDING', (0,0), (-1,-1), 12),
            ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ]))
        story.append(t)
        story.append(Spacer(1, 3*mm))

    story.append(PageBreak())

    # ── SECTION 14: LONG-TERM VISION ──────────────────────────────────────────
    story.append(Paragraph('14. Long-Term Vision', styles['SectionHeading']))
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY))
    story.append(Spacer(1, 3*mm))

    story.append(Paragraph(
        'EduScan Pro starts as a test management tool but has the foundation to become a '
        '<b>full Coaching ERP</b> — the operating system for every coaching institute in India.',
        styles['Body']))
    story.append(Spacer(1, 4*mm))

    vision_phases = [
        ('Year 1 — Platform', [
            'Stable OMR + Online Test + Website product',
            'Acquire first 100 paying institutes',
            'Refine UX based on real usage feedback',
            'Build predefined question bank (Physics, Chemistry, Maths, Biology)',
        ]),
        ('Year 2 — Ecosystem', [
            'Student learning app (practice mode, analytics)',
            'Attendance and fee management module',
            'Parent notifications (SMS/WhatsApp)',
            'National leaderboard for institutes',
        ]),
        ('Year 3 — Platform Play', [
            'White-label version for larger institute chains',
            'API access for third-party integrations',
            'National test platform (scholarship exams, mock tests)',
            'Potential acquisition target for large EdTech companies',
        ]),
    ]

    for phase, items in vision_phases:
        inner = [Paragraph(f'<b><font color="#1a237e">{phase}</font></b>', styles['SubHeading'])]
        for item in items:
            inner.append(check(item, styles))
        t = Table([[inner]], colWidths=[W - 40*mm])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), LIGHT_BG),
            ('BOX', (0,0), (-1,-1), 0.5, BORDER),
            ('TOPPADDING', (0,0), (-1,-1), 8),
            ('BOTTOMPADDING', (0,0), (-1,-1), 8),
            ('LEFTPADDING', (0,0), (-1,-1), 12),
            ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ]))
        story.append(t)
        story.append(Spacer(1, 4*mm))

    # Final summary box
    summary = Table([[
        Table([
            [Paragraph('<b>Final Verdict</b>', styles['SectionHeading'])],
            [Paragraph('EduScan Pro is a <b>high-potential, real-demand SaaS business</b> that:', styles['Body'])],
            [check('Solves a genuine daily problem for thousands of institutes', styles)],
            [check('Has clear monetization with strong recurring revenue', styles)],
            [check('Creates deep customer lock-in once adopted', styles)],
            [check('Fits your existing tech stack (Angular + Node.js)', styles)],
            [check('Can start small (MVP in 45 days) and scale fast', styles)],
            [Spacer(1, 4*mm)],
            [Paragraph('<b>Start with the MVP. Get 5 paying institutes. Then build more.</b>', styles['TagLine'])],
        ], colWidths=[W - 60*mm]),
    ]], colWidths=[W - 40*mm])
    summary.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), HexColor('#e8eaf6')),
        ('BOX', (0,0), (-1,-1), 2, PRIMARY),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 16),
        ('RIGHTPADDING', (0,0), (-1,-1), 16),
    ]))
    story.append(summary)
    story.append(Spacer(1, 6*mm))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER))
    story.append(Spacer(1, 3*mm))
    story.append(Paragraph(
        'EduScan Pro \u2022 Business Blueprint v1.0 \u2022 Confidential',
        styles['Caption']))

    doc.build(story)
    print(f"PDF generated: {path}")


if __name__ == '__main__':
    build_pdf('EduScan_Pro_Business_Blueprint.pdf')
