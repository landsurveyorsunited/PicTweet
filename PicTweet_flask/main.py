from flask import Flask, request, redirect, url_for, render_template, session , jsonify
from flask import flash
from functools import wraps
from util import *
import api
import config
import numpy as np 
from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper


app = Flask(__name__)
app.secret_key = config.APP_SECRET

	
def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers
            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            h['Access-Control-Allow-Credentials'] = 'true'
            h['Access-Control-Allow-Headers'] = \
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator



@app.route('/')
def index():
    return render_template('main.html')


@app.route('/topic')

def paper():


    return render_template('topic.html')



@app.route('/_add_numbers',methods=['GET', 'POST','OPTIONS'])
@crossdomain(origin='*')
def _add_numbers():
 

 a = request.args.get('a', 0, type=str)
 #b = request.args.get('b', 0, type=int)
 quote,image = api.parse(a)
 app.logger.info('================')
 app.logger.info(a)
 a = "https://cdn0.vox-cdn.com/thumbor/xgSQuztumB9vVqm_YKP12gPNHyU=/800x0/filters:no_upscale()/cdn0.vox-cdn.com/uploads/chorus_asset/file/2939696/countries_that_are_south_sudan.0.png"

 return jsonify(result=quote,linke=image)
	# a=request.args.get('a',0,type=str)
	# #p1=api.read_name(a)
	# print(a)

	# p1 = api.read_paper1(a)
	# print(p1)
	# return p1





# def target(item,paper):
#     for i,lists in enumerate(paper):
#         for j,topix in enumerate(lists):
#             if topix== item:
#                 return(i,j)

def target(item, paper):
    import numpy
    ar = numpy.array(paper)
    return numpy.where(ar==item)







if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5010)
