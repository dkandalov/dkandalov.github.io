---
draft: true 
permalink: note-on-loudness
---

### Theory

These days audio loudness is measured in [LUFS](https://en.wikipedia.org/wiki/LKFS) (Loudness Units relative to Full Scale).
This is a relative measurement, where, as I understand, `0 LUFS` is the loudest audio you’re allowed to broadcast according to the standard by [European Broadcasting Union](https://en.wikipedia.org/wiki/European_Broadcasting_Union). 
And `-10 LUFS` is 10 decibel quieter than `0 LUFS`. Although LUFS is a bit more involved than decibel and measures "weighted perceived loudness".

Youtube guarantees that videos are not louder than `-13 LUFS`, i.e. if you upload content louder than that, it will be normalised to `-13 LUFS`. In terms of the loudness of actual youtube videos, I looked at couple channels and found that some of them try to be as loud as possible at -13 or -15 (maybe because that’s the loudness of youtube ads), while other channels are not that loud, around -30 (in particular, I looked at conference talks). 

I didn’t come to a conclusion what is the "right" loudness level for youtube but in general **the recommended broadcasting level is `-23 LUFS`** (see [EBU R128 Introduction](https://www.youtube.com/watch?v=iuEtQqC-Sqo) video for details).

### Practice 

You can measure LUFS of a video using `ffmpeg`.
For example, 
```
ffmpeg -nostats -i 'video.mp4' -filter_complex ebur128 -f null -
``` 
will print few lines to console and in the end a summary with something like:
```
Integrated loudness:
I:         -15.9 LUFS
```
where "integrated" means it was calculated for the whole video, not just a part of it.

You can also download videos from youtube using [youtube-dl](https://github.com/ytdl-org/youtube-dl) and then run them through `ffmpeg` to determine their loudness.

To increase volume of a video you can do 
```
ffmpeg -i inputfile -vcodec copy -af "volume=10dB" outputfile
```
