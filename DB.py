from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

port = os.environ.get('PORT', 8081)
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:6nq0aRXfYmVJ5kpNNmINf4UtvsQGb1wl@dpg-cu06925ds78s73d91ac0-a.oregon-postgres.render.com/backyardtally_db'
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://benjman:0624@localhost:5432/backyardtally_db'

db = SQLAlchemy(app)



class UserScore(db.Model):
    __tablename__ = 'user_scores'
    __table_args__ = {"schema": "backyardtally"}
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    ppr = db.Column(db.Float, nullable=False)
    dpr = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
        'id': self.id,
        'username': self.username,
        'ppr': self.ppr,
        'dpr': self.dpr
    }

    def __repr__(self):
        return f"<UserScore {self.username}"

with app.app_context():
    db.create_all()

@app.route('/', methods=['GET'])
def get_user_data():
    try:
        user_scores = UserScore.query.all()
        return jsonify([user.to_dict() for user in user_scores]), 200
    except Exception as e:
        return jsonify({'message': 'Error fetching data', 'error': str(e)}), 500


@app.route('/userdb', methods=['POST'])
def create_user():
    data = request.get_json()
    try:
        username = data.get('username')
        ppr= data.get('ppr')
        dpr = data.get('dpr')

        new_user = UserScore(username=username, ppr=ppr, dpr=dpr)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'DATA ADDED'})
    except Exception as e:
        return jsonify({'message': 'Error inserting', 'error': str(e)}), 500
    
@app.route('/userdb', methods=['PUT'])
def update_user():
    data = request.get_json()
    username = data.get('username')
    ppr = data.get('ppr')
    dpr = data.get('dpr')

    try:
        user = UserScore.query.filter_by(username=username).first()
        if user:
            user.ppr = ppr
            user.dpr = dpr
            db.session.commit()
            return jsonify({
                'success': True,
                'message': 'USER UPDATED',
            }), 200
        else:
            return jsonify({"success": False, "message": "User not found"}), 404
    except Exception as e:
        return jsonify({'message': 'ERROR UPDATING'}), 500
    
@app.route('/StatsBoard/users/<username>', methods=['GET'])
def stats_board(username):
    try:
        user = UserScore.query.filter_by(username=username).first()
        return render_template('stats_board_template.html', data=[user])
    except Exception as e:
        return jsonify({'message': 'ERROR FETCHING STATS', 'error': str(e)}),500

    
@app.route('/StatsBoard/users', methods=['GET'])
def list_users():
    try:
        users = UserScore.query.all()
        
        return render_template('users_dropdown.html', data=users)
    except Exception as e:
        return jsonify({'message': 'ERROR FETCHING STATS', 'error': str(e)}),500



if __name__ == '__main__':
    app.run(debug=True,port=port, host='0.0.0.0')

