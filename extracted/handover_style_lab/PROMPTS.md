# 生成提示词存档｜Style Lab

> 用途：让接手者能复现或微调这些样片，而不是对着一张图猜"怎么做的"。
> 工具：WorkBuddy 的 `ImageGen`（图）/ `VideoGen`（视频，image-to-video）。
> 注意：AI 生成有随机性，同提示词不保证同结果；本包固定的是成品，不是"可复现构建"。

---

## 0. 共同前提

所有静态图都遵循同一句话：

> **同一口 60cm 超白缸、荷兰式造景、前视平视固定机位，只换画风，不换景。**

场景要素固定为：绿毯前景 + 红/绿茎草分层丛植 + 右侧沉木 + 宝莲灯鱼群 + 顶部 LED + 暗房背景。

图像参数：

```
size: 1536x1024
quality: high
negative: no text, no watermark, no people
```

---

## 1. 静态图提示词（7 张成品）

### ① 吉卜力水彩 `01_ghibli.png`

```
Front view of a 60cm rimless ultra-clear aquarium aquascaped in Dutch style: lush green
carpet plant foreground, tiered groups of red and green stem plants, a piece of driftwood
on the right, a small school of neon tetras, crystal clear water with tiny CO2 bubbles,
LED light from above, dark room background. Rendered as a hand-painted Studio Ghibli
background: soft watercolor and gouache texture, gentle visible brush strokes, warm
natural daylight, muted earthy greens and ochres, painterly soft edges, nostalgic
Miyazaki film background art, storybook atmosphere. No text, no watermark, no people.
```

### ② 新海诚光影 `02_shinkai.png`

```
Front view of the SAME 60cm rectangular rimless ultra-clear aquarium, aquascaped in Dutch
style: lush green carpet plant foreground, tiered groups of red and green stem plants, a
piece of driftwood on the right, a small school of neon tetras, crystal clear water with
tiny CO2 bubbles, LED light from above, dark room background. Rendered in Makoto Shinkai
anime style: hyper-detailed volumetric god rays piercing the water, lens flare, crisp
glass reflections, saturated teal-cyan and warm amber highlights, cinematic bloom, glossy
specular highlights, luminous twilight gradient, ultra clean digital anime finish.
No text, no watermark, no people.
```

### ③ 京都动画柔光 `03_kyoani.png`

```
Front view of the SAME 60cm rectangular rimless ultra-clear aquarium, aquascaped in Dutch
style: green carpet foreground, tiered red and green stem plants, driftwood on the right,
a school of neon tetras, clear water, LED light above, dark room. Drawn as a Kyoto
Animation TV anime still, unmistakably 2D hand-drawn animation: crisp thin line art
outlining every leaf, stem and fish, clean two-tone cel shading with soft gradient bands,
pastel mint-green and cream palette, bright airy high-key lighting, delicate glass
highlight, simple tidy interior background, subtle rim light. High quality anime key
frame, NOT photorealistic, no 3D render, no text, no watermark, no people.
```

### ④ 90s 复古赛璐璐 `04_retro90s.png`

```
Front view of the SAME 60cm rectangular rimless ultra-clear aquarium, aquascaped in Dutch
style: lush green carpet plant foreground, tiered groups of red and green stem plants, a
piece of driftwood on the right, a small school of neon tetras, crystal clear water with
tiny CO2 bubbles, LED light from above, dark room background. Rendered as a 1990s retro
anime cel: bold black ink outlines, flat cel shading with hard shadow edges, slightly
faded film colors, warm magenta-and-teal vintage palette, hand-painted acetate cel
texture, subtle film grain, nostalgic 90s TV anime look. No text, no watermark, no people.
```

### ⑤ Q 版萌系 `05_chibi.png`

```
Front view of the SAME 60cm RECTANGULAR rimless ultra-clear aquarium, straight vertical
glass sides, NOT bow front. Dutch aquascape layout identical to the reference: dense green
carpet across the whole foreground, tiered groups of red and green stem plants on the left
and center, one piece of driftwood leaning on the right, a school of ten neon tetras
spread through mid-water, clear water, slim LED bar above, dark room. Rendered in cute
chibi kawaii anime style: rounded simplified shapes but the tank itself stays strictly
rectangular, thick soft outlines, big glossy expressive eyes on the fish, pastel mint and
peach palette, sticker-like flat colors, soft sparkles and bubbles, adorable and huggable.
No text, no watermark, no people.
```

> ⚠ 这一版为了 Q 版的马卡龙统一性，**鱼被画成了粉色**。若要物种准确，把最后一句改成：
> `The fish MUST be neon tetras: slender silver body, vivid cyan-blue horizontal stripe, bright red rear half. Do NOT make them pink.`
> 代价是"萌度"会下降（试过，见 §3 返工记录）。

### ⑥ 温柔奇幻 `06_supernatural.png`

```
Front view of the SAME 60cm rectangular rimless ultra-clear aquarium, aquascaped in Dutch
style: lush green carpet plant foreground, tiered groups of red and green stem plants, a
piece of driftwood on the right, a small school of neon tetras, crystal clear water with
tiny CO2 bubbles, LED light from above, dark room background. Rendered in gentle
supernatural anime style: bioluminescent glow inside the water, floating motes of light
like fireflies, soft blue-green luminescence, ethereal haze, dreamy mystical atmosphere,
forest-spirit vibe, gentle darkness with glowing accents, quiet and otherworldly.
No text, no watermark, no people.
```

### ⑦ 经典赛璐璐 `07_cel_classic.png`

```
Front view of the SAME 60cm RECTANGULAR rimless ultra-clear aquarium, Dutch aquascape:
dense green carpet across the foreground, tiered groups of red and green stem plants, one
piece of driftwood on the right, ten neon tetras (slender silver body, vivid cyan-blue
horizontal stripe, bright red rear half), clear water, slim LED bar above, plain dark
studio background. Drawn as a CLASSIC CEL-SHADED ANIME STILL, modern TV anime key frame:
crisp uniform black-brown line art of consistent weight outlining every leaf and fish,
flat solid color fills, exactly two tones per material (base tone plus one hard-edged
shadow tone), absolutely NO gradients, NO airbrush, NO soft shading, NO bloom, NO film
grain, clean saturated palette, bright even key light, one simple white highlight block on
the glass. Sharp, graphic, unmistakably 2D animation. No text, no watermark, no people.
```

---

## 2. 视频提示词（7 条 5 秒循环）

参数统一：

```
mode: image-to-video（以上一张成品作为首帧）
seconds: 5
enable_audio: false
```

### 3D 纵深派（允许推镜与视差）

**① `01_ghibli.mp4`**
```
Hand-painted Studio Ghibli watercolor animation comes alive. The aquarium becomes a real
3D space with gentle depth: neon tetras swim slowly at different depths, foreground carpet
plants sway while background plants move less, tiny bubbles rise, soft caustic light drifts
across the substrate. Very slow dolly-in with subtle parallax, watercolor brushstroke
texture preserved, warm natural light. No morphing, no distortion, no text, no watermark.
```

**② `02_shinkai.mp4`**
```
Makoto Shinkai anime style comes alive as a living 3D scene. Volumetric god rays slowly
sweep through the water, lens flare drifts across the glass, neon tetras swim at clearly
different depths creating strong parallax, glass reflections shimmer, caustic patterns
ripple on the substrate, tiny bubbles rise. Slow cinematic dolly-in with real spatial
depth. Keep the crisp digital anime rendering and saturated teal-amber palette.
No morphing, no distortion, no text, no watermark.
```

**③ `03_kyoani.mp4`**
```
Kyoto Animation soft everyday style comes gently alive. Understated motion: neon tetras
drift at slightly different depths with soft parallax, delicate plants sway in a slow
current, tiny bubbles rise, morning light shifts almost imperceptibly on the glass. Very
slow subtle dolly-in, real 3D volume but restrained and quiet. Keep the clean pastel
high-key palette and delicate line art. No dramatic movement, no morphing, no text,
no watermark.
```

**⑤ `05_chibi.mp4`**
```
The cute chibi aquarium comes alive like a hand-made toy diorama with real 3D depth. Chubby
big-eyed fish bob and paddle at clearly different depths, creating playful parallax; plants
sway; bubbles rise in clusters; tiny sparkles twinkle and fade. Very slow gentle dolly-in
as if peeking into a miniature world. Keep thick soft outlines, flat sticker-like colors
and the pastel macaron palette. No morphing, no distortion, no text, no watermark.
```

**⑥ `06_supernatural.mp4`**
```
The gentle supernatural aquarium breathes. Bioluminescent motes drift slowly through the
water at many different depths, creating strong volumetric parallax; the glow pulses softly
and unevenly; neon tetras glide like faint silver-blue streaks; caustic light ripples across
the plants; faint mist curls near the substrate. Slow dreamy push-in through the water.
Keep the deep blue-green palette with soft glowing accents. No morphing, no distortion,
no text, no watermark.
```

### 2D 平面派（明确禁止推镜与景深）

**④ `04_retro90s.mp4`**
```
Authentic 1990s TV anime cel animation, flat 2D limited animation on twos. The fish glide
in simple lateral loops with stiff, economical motion; plants barely sway; bubbles pop in
place. Absolutely NO camera movement, NO parallax, NO 3D depth, NO dolly-in. Keep bold
black ink outlines locked and flat two-tone cel shadows unchanged. Constant subtle film
grain and slight scanline softness. No morphing, no text, no watermark.
```

**⑦ `07_cel_classic.mp4`**
```
Classic cel-shaded TV anime animation, flat 2D limited animation on twos. Fish glide across
the frame in simple lateral paths with crisp snappy timing; plants stay almost still; a few
bubbles rise. Absolutely NO camera movement, NO parallax, NO depth of field, NO 3D
perspective shift. Bold uniform ink outlines stay locked, flat solid colors stay locked,
each material keeps exactly two tones. Clean graphic look, no grain, no bloom.
No morphing, no text, no watermark.
```

---

## 3. 返工记录（踩过的坑，别重复）

| # | 问题 | 原因 | 修法 |
|---|---|---|---|
| 1 | 6 张并行生成，最终只剩 4 张 | 两条调用**同一秒完成**，输出文件名相同，后者覆盖前者 | 补画时每条用**独立 output_dir**；重要批次**串行** |
| 2 | Q 版画成弧面缸 | 模型把"超白缸"理解成常见弧面成品缸 | 提示词写死 `RECTANGULAR`、`straight vertical glass sides`、`NOT bow front` |
| 3 | Q 版鱼变粉色且没有蓝侧带 | 马卡龙色板把鱼一起带偏 | 显式列物种特征：`silver body, cyan-blue horizontal stripe, bright red rear half, Do NOT make them pink` |
| 4 | 京都版第一版太写实，像照片 | 只写"Kyoto Animation"约束不够 | 加 `unmistakably 2D hand-drawn`、`crisp thin line art`、`NOT photorealistic, no 3D render` |
| 5 | 赛璐璐被理解成"复古滤镜" | 第一条提示词带了 90s/褪色/颗粒 | 单开 ⑦：只写 `two tones, hard edge, NO gradients, NO grain` |

---

## 4. 成本参考

| 类型 | 单次消耗 | 本任务次数 |
|---|---|---|
| ImageGen（1536×1024 / high） | 约 5–10 credits | 12 次（7 张成品 + 5 次返工） |
| VideoGen（5s） | 约 50–100 credits | 7 次 |

合计约 **410–820 credits**。重跑前先确认额度。
