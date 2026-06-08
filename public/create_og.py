from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, random, os

# Canvas
W, H = 1200, 630
img = Image.new("RGB", (W, H), "#060C18")
draw = ImageDraw.Draw(img)

FONTS = r"C:\Users\HP\AppData\Roaming\Claude\local-agent-mode-sessions\skills-plugin\daa072c2-2320-4eaa-bb39-810287a05719\a5a84770-502c-44bf-80d5-921666456db5\skills\canvas-design\canvas-fonts"

# ── LAYER 1: Deep background radial glow (purple bottom-left, electric top-right)
glow = Image.new("RGB", (W, H), "#060C18")
gd = ImageDraw.Draw(glow)

def radial_glow(draw_img, cx, cy, r_max, color_rgb, steps=60):
    for i in range(steps, 0, -1):
        r = int(r_max * i / steps)
        alpha = int(18 * (i / steps) ** 2)
        cr, cg, cb = color_rgb
        fill = (cr, cg, cb)
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        od.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*fill, alpha))
        base = img.convert("RGBA")
        base.alpha_composite(overlay)
        img.paste(base.convert("RGB"))

radial_glow(draw, 180, 480, 420, (123, 92, 245))   # purple bottom-left
radial_glow(draw, 980, 120, 340, (0, 194, 255))    # electric top-right
radial_glow(draw, 620, 315, 200, (0, 219, 130))    # faint green center

draw = ImageDraw.Draw(img)

# ── LAYER 2: Neural network nodes & connections
random.seed(42)
nodes = [
    (95,  85),  (240, 140), (380,  60), (520, 180), (660,  90),
    (800, 160), (940,  70), (1080,130), (1140,240),
    (60, 280),  (200, 320), (360, 260), (500, 340), (640, 270),
    (780, 310), (920, 260), (1060,320),
    (120, 470), (280, 510), (440, 450), (600, 520), (740, 460),
    (880, 510), (1020,450), (1150,520),
    (50, 580),  (300, 590), (700, 580), (1100,590),
]

# Connections
connection_pairs = [
    (0,1),(1,2),(2,3),(3,4),(4,5),(5,6),(6,7),(7,8),
    (9,10),(10,11),(11,12),(12,13),(13,14),(14,15),(15,16),
    (17,18),(18,19),(19,20),(20,21),(21,22),(22,23),(23,24),
    (0,9),(1,10),(2,11),(3,12),(4,13),(5,14),(6,15),(7,16),
    (9,17),(10,18),(11,19),(12,20),(13,21),(14,22),(15,23),(16,24),
    (17,25),(19,26),(21,27),(23,28),
    (1,11),(3,13),(5,15),(10,19),(12,21),(14,23),
]

for a, b in connection_pairs:
    if a < len(nodes) and b < len(nodes):
        x1, y1 = nodes[a]
        x2, y2 = nodes[b]
        dist = math.sqrt((x2-x1)**2 + (y2-y1)**2)
        alpha = max(12, int(55 - dist * 0.05))
        draw.line([(x1, y1), (x2, y2)], fill=(0, 194, 255, alpha), width=1)

# Draw node dots
for i, (nx, ny) in enumerate(nodes):
    # outer glow ring
    for r in [7, 5, 3]:
        a = [14, 30, 60][7-r if 7-r < 3 else 2]
        draw.ellipse([nx-r, ny-r, nx+r, ny+r], fill=(0, 194, 255))
    # bright center
    draw.ellipse([nx-2, ny-2, nx+2, ny+2], fill=(232, 240, 254))

# ── LAYER 3: Diagonal geometric accent lines
for i in range(6):
    x_start = -100 + i * 280
    color_intensity = [20, 15, 12, 10, 8, 6][i]
    draw.line([(x_start, 0), (x_start + H, H)],
              fill=(123, 92, 245, color_intensity), width=1)

# ── LAYER 4: Glassmorphism card (main content area)
card_x1, card_y1 = 60, 170
card_x2, card_y2 = 780, 470

# Card background
card_bg = Image.new("RGBA", (W, H), (0, 0, 0, 0))
cd = ImageDraw.Draw(card_bg)
cd.rounded_rectangle([card_x1, card_y1, card_x2, card_y2],
                      radius=20, fill=(14, 22, 40, 160))
img_rgba = img.convert("RGBA")
img_rgba.alpha_composite(card_bg)
img = img_rgba.convert("RGB")
draw = ImageDraw.Draw(img)

# Card border (glass effect)
draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2],
                        radius=20, outline=(0, 194, 255, 35), width=1)

# ── LAYER 5: Typography
# COGNITIA — BigShoulders Bold (closest to Bebas Neue)
try:
    font_title = ImageFont.truetype(os.path.join(FONTS, "BigShoulders-Bold.ttf"), 118)
except:
    font_title = ImageFont.load_default()

try:
    font_tag = ImageFont.truetype(os.path.join(FONTS, "InstrumentSans-Regular.ttf"), 26)
except:
    font_tag = ImageFont.load_default()

try:
    font_label = ImageFont.truetype(os.path.join(FONTS, "GeistMono-Regular.ttf"), 13)
except:
    font_label = ImageFont.load_default()

try:
    font_sub = ImageFont.truetype(os.path.join(FONTS, "InstrumentSans-Bold.ttf"), 18)
except:
    font_sub = ImageFont.load_default()

# "COGNITIA" main title with gradient effect
title_text = "COGNITIA"
tx, ty = 100, 210

# Purple shadow layer
draw.text((tx+2, ty+2), title_text, font=font_title, fill=(83, 52, 165))
# Electric blue highlight
draw.text((tx, ty), title_text, font=font_title, fill=(0, 194, 255))
# White core for depth
draw.text((tx+1, ty+1), title_text, font=font_title, fill=(180, 220, 255, 120))

# Tagline
tag_y = ty + 128
tag_text = "Agentes de IA que trabajan 24/7 en tu negocio"
draw.text((tx, tag_y), tag_text, font=font_tag, fill=(200, 220, 254))

# Separator line
sep_y = tag_y + 46
draw.line([(tx, sep_y), (tx + 560, sep_y)], fill=(0, 219, 130), width=1)

# Sub-label
draw.text((tx, sep_y + 14), "AUTOMATIZACIÓN · AGENTES IA · RESULTADOS DESDE EL DÍA 1",
          font=font_label, fill=(0, 219, 130))

# ── LAYER 6: Right side — abstract circuit/data visual
rp_x = 840  # right panel start

# Vertical data bars (like signal strength)
bar_data = [0.3, 0.6, 0.45, 0.9, 0.7, 0.5, 0.85, 0.4, 0.65, 0.75, 0.55, 0.95]
bar_w = 18
bar_gap = 10
bar_base_y = 480
max_bar_h = 200

for i, val in enumerate(bar_data):
    bx = rp_x + i * (bar_w + bar_gap)
    bh = int(max_bar_h * val)
    # Gradient: green for high, blue for low
    if val > 0.7:
        col = (0, 219, 130)
    elif val > 0.5:
        col = (0, 194, 255)
    else:
        col = (91, 141, 239)

    # Bar with alpha glow
    for layer in range(3):
        lx = bx - layer
        lw = bar_w + layer * 2
        alpha = [180, 60, 20][layer]
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        od.rectangle([lx, bar_base_y - bh, lx + lw, bar_base_y],
                     fill=(*col, alpha))
        base = img.convert("RGBA")
        base.alpha_composite(overlay)
        img = base.convert("RGB")

    draw = ImageDraw.Draw(img)

# Circular progress arc (top right)
arc_cx, arc_cy = 1040, 220
arc_r = 95

# Background circle
draw.ellipse([arc_cx-arc_r, arc_cy-arc_r, arc_cx+arc_r, arc_cy+arc_r],
             outline=(30, 45, 70), width=2)

# Progress arc (electric blue, ~75%)
bbox = [arc_cx-arc_r, arc_cy-arc_r, arc_cx+arc_r, arc_cy+arc_r]
draw.arc(bbox, start=-90, end=180, fill=(0, 194, 255), width=3)

# Inner arc (green, ~45%)
arc_r2 = 72
bbox2 = [arc_cx-arc_r2, arc_cy-arc_r2, arc_cx+arc_r2, arc_cy+arc_r2]
draw.arc(bbox2, start=-90, end=72, fill=(0, 219, 130), width=2)

# Center text of arc
draw.text((arc_cx - 18, arc_cy - 20), "24/7", font=font_sub, fill=(232, 240, 254))
draw.text((arc_cx - 22, arc_cy + 4), "ACTIVO", font=font_label, fill=(0, 219, 130))

# Small decorative dots grid (top right area)
dot_start_x, dot_start_y = 860, 60
for di in range(8):
    for dj in range(4):
        dx = dot_start_x + di * 28
        dy = dot_start_y + dj * 28
        # Vary opacity based on position
        opacity_factor = 0.3 + 0.5 * random.random()
        dot_col = (int(0 * opacity_factor), int(194 * opacity_factor), int(255 * opacity_factor))
        r_dot = 2
        draw.ellipse([dx-r_dot, dy-r_dot, dx+r_dot, dy+r_dot], fill=dot_col)

# ── LAYER 7: Domain label bottom
url_font = font_label
draw.text((100, 546), "cognitiamx.com", font=url_font, fill=(122, 143, 173))

# Tiny logo mark (diamond shape)
dm_x, dm_y = 68, 550
pts = [(dm_x, dm_y-8), (dm_x+8, dm_y), (dm_x, dm_y+8), (dm_x-8, dm_y)]
draw.polygon(pts, fill=(0, 194, 255))

# ── FINAL: subtle vignette overlay
vignette = Image.new("RGBA", (W, H), (0, 0, 0, 0))
vd = ImageDraw.Draw(vignette)
for i in range(70):
    margin = i * 4
    if W - margin > margin and H - margin > margin:
        alpha = int(60 * (1 - i/70) ** 2)
        vd.rectangle([margin, margin, W-margin, H-margin],
                     outline=(6, 12, 24, alpha))
base = img.convert("RGBA")
base.alpha_composite(vignette)
img = base.convert("RGB")

# Save
out_path = r"C:\Users\HP\OneDrive\Documentos\GitHub\cognitia-web\public\og-image.jpg"
img.save(out_path, "JPEG", quality=95)
print(f"Saved: {out_path} ({W}x{H}px)")
