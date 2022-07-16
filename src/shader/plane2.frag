uniform float iTime;
uniform vec2 iResolution;
in vec2 vUv;
out vec4 outColor;

#define PI2 6.28318530718
#define MAX_ITER 4

vec3 caustic(vec2 uv)
{
    vec2 p = mod(uv*PI2, PI2)-250.0;
    float time = iTime * .5+23.0;

    vec2 i = vec2(p);
    float c = 1.0;
    float inten = .005;

    for (int n = 0; n < MAX_ITER; n++)
    {
        float t = time * (1.0 - (3.5 / float(n+1)));
        i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
        c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
    }

    c /= float(MAX_ITER);
    c = 1.17-pow(c, 1.4);
    vec3 color = vec3(pow(abs(c), 8.0));
    color = clamp(color + vec3(0.0, 0.35, 0.5), 0.0, 1.0);
    color = mix(color, vec3(1.0,1.0,1.0),0.3);

    return color;
}

void main()
{
    vec3 skyColor = vec3(0.3, 1.0, 1.0);
    vec3 horizonColor = vec3(0.0, 0.05, 0.2);
    vec2 p = (-iResolution.xy + 2.0 * gl_FragCoord.xy) / iResolution.y;
    vec3 eye = vec3(0.0, 1.25, 1.5);
    vec2 rot = vec2(0.0, 0.65);

    eye.yz = cos(rot.y) * eye.yz + sin(rot.y) * eye.zy * vec2(-1.0, 1.0);
    eye.xz = cos(rot.x) * eye.xz + sin(rot.x) * eye.zx * vec2(1.0, -1.0);

    vec3 ro = eye;
    vec3 ta = vec3(0.5, 1.0, 0.0);
    vec3 cw = normalize(ta - ro);
    vec3 cu = normalize(cross(vec3(0.0, 1.0, 0.0), cw));
    vec3 cv = normalize(cross(cw, cu));
    mat3 cam = mat3(cu, cv, cw);
    vec3 rd = cam * normalize(vec3(p.xy, 1.0));

    // background
    vec3 color = skyColor;

    // 水面
    color += (
        (0.3*caustic(vec2(p.x,p.y))) +
        (0.3*caustic(vec2(p.x,p.y*2.7)))
    ) * pow(p.y,4.0);

    // horizon
    color = mix(color, horizonColor, pow(1.0 - pow(rd.y,7.0), 12.0));
    color += mix(vec3(0.0), skyColor, rd.y * 0.1);

    // gamma correction
    vec3 gamma = vec3(0.454564);
    outColor = vec4(pow(color, gamma), 1.0);
}
