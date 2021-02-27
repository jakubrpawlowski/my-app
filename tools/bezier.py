import os
import json
import pprint
import bpy

output = {}
output['curves'] = []


def dollarstocents(n):
    return int(n * 100)


for curve in bpy.data.curves:
    print('Adding the curve: {}'.format(curve.name))
    control_points = curve.splines[0].bezier_points
    scale = bpy.data.objects[curve.name].scale[0]

    output['curves'].append({
        'name': curve.name,
        'points': []
    })

    out_points = output['curves'][-1]['points']

    for p in control_points:
        coord = p.co * scale
        print('coord', coord)
        l_handle = p.handle_left * scale
        r_handle = p.handle_right * scale
        print("\t - add points, coord: {}, left_handle: {}, right_handle: {}".format(coord, l_handle, r_handle))
        out_points.append({
            'coord': list(map(dollarstocents, coord[:])),
            'right_handle': list(map(dollarstocents, r_handle[:])),
            'left_handle': list(map(dollarstocents, l_handle[:])),
        })

filename = bpy.path.basename(bpy.data.filepath).split('.')[
    0]+'_curve_data.json'
with open(bpy.path.abspath('//'+filename), 'w') as f:
    print('\nWriting the output in:{}'.format(bpy.path.abspath('//'+filename)))
    json.dump(output, f, ensure_ascii=False)

print('\nOutput preview:')
json_output = json.dumps(output)
pp = pprint.PrettyPrinter(indent=4)
pp.pprint(json_output)
