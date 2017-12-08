if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'kotlin-js-katas'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'kotlin-js-katas'.");
}
this['kotlin-js-katas'] = function (_, Kotlin) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var throwCCE = Kotlin.throwCCE;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var Unit = Kotlin.kotlin.Unit;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var plus = Kotlin.kotlin.collections.plus_qloxvw$;
  var zipWithNext = Kotlin.kotlin.collections.zipWithNext_7wnvza$;
  var toList = Kotlin.kotlin.sequences.toList_veqyi0$;
  var getCallableRef = Kotlin.getCallableRef;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var mapOf = Kotlin.kotlin.collections.mapOf_qfcya0$;
  var equals = Kotlin.equals;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var toBoxedChar = Kotlin.toBoxedChar;
  var Pair = Kotlin.kotlin.Pair;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var unboxChar = Kotlin.unboxChar;
  var joinToString = Kotlin.kotlin.collections.joinToString_fmv235$;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var mapOf_0 = Kotlin.kotlin.collections.mapOf_x2b85n$;
  var math = Kotlin.kotlin.math;
  var asIterable = Kotlin.kotlin.text.asIterable_gw00vp$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var CoroutineImpl = Kotlin.kotlin.coroutines.experimental.CoroutineImpl;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.experimental.intrinsics.COROUTINE_SUSPENDED;
  var buildSequence = Kotlin.kotlin.coroutines.experimental.buildSequence_of7nec$;
  var kotlin_js_internal_DoubleCompanionObject = Kotlin.kotlin.js.internal.DoubleCompanionObject;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var map = Kotlin.kotlin.sequences.map_z5avom$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var throwUPAE = Kotlin.throwUPAE;
  var THREE$LineBasicMaterial = THREE.LineBasicMaterial;
  var THREE$PerspectiveCamera = THREE.PerspectiveCamera;
  var THREE$Scene = THREE.Scene;
  var THREE$WebGLRenderer = THREE.WebGLRenderer;
  var THREE$ShaderPass = THREE.ShaderPass;
  var THREE$BloomPass = THREE.BloomPass;
  var THREE$EffectComposer = THREE.EffectComposer;
  var THREE$RenderPass = THREE.RenderPass;
  var THREE$Geometry = THREE.Geometry;
  var THREE$Line = THREE.Line;
  var THREE$OrbitControls = THREE.OrbitControls;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var THREE$Color = THREE.Color;
  var THREE$Vector3 = THREE.Vector3;
  var take = Kotlin.kotlin.collections.take_ba2ldo$;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var THREE$Euler = THREE.Euler;
  var toString = Kotlin.toString;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  function drawSnowflake$display(closure$context) {
    return function ($receiver) {
      var $receiver_0 = shift($receiver, 100.0, 100.0);
      var closure$context_0 = closure$context;
      closure$context_0.moveTo(first($receiver_0).x, first($receiver_0).y);
      var tmp$;
      tmp$ = $receiver_0.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        closure$context_0.lineTo(element.x, element.y);
        closure$context_0.stroke();
        closure$context_0.moveTo(element.x, element.y);
      }
      return $receiver;
    };
  }
  function drawSnowflake() {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('myCanvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    var display = drawSnowflake$display(context);
    display(kochSnowflakePoints());
  }
  var Math_0 = Math;
  function kochSnowflakePoints(length) {
    if (length === void 0)
      length = 300.0;
    var h = Math_0.sqrt(3.0) / 2 * length;
    var points = listOf([new Point(0.0, h), new Point(length, h), new Point(length / 2, 0.0)]);
    return plus(addNested(points, length), first(points));
  }
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var addAll = Kotlin.kotlin.collections.addAll_ipc267$;
  function addNested(points, length, depth) {
    if (depth === void 0)
      depth = 1;
    if (depth === 0)
      return points;
    var $receiver = pairs(points);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var p1 = element.component1()
      , p2 = element.component2();
      var y = p2.y - p1.y;
      var x = p2.x - p1.x;
      var angle = Math_0.atan2(y, x);
      var h = Math_0.sqrt(3.0) / 2 * length;
      var $receiver_0 = listOf([new Point(0.0, 0.0), new Point(1.0 / 3 * length, 0.0), new Point(1.5 / 3 * length, h / 3), new Point(2.0 / 3 * length, 0.0)]);
      var destination_0 = ArrayList_init(collectionSizeOrDefault($receiver_0, 10));
      var tmp$_0;
      tmp$_0 = $receiver_0.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        destination_0.add_11rb$(item.rotate_14dthe$(angle).shift_lu1900$(p1.x, p1.y));
      }
      var list = destination_0;
      addAll(destination, list);
    }
    var result = destination;
    return addNested(result, length / 3, depth - 1 | 0);
  }
  function pairs($receiver) {
    return zipWithNext(plus($receiver, first($receiver)));
  }
  function main$paintCanvas(closure$context, closure$canvas, closure$presenter) {
    return function () {
      closure$context.fillRect(0.0, 0.0, closure$canvas.width, closure$canvas.height);
      closure$context.beginPath();
      var $receiver = zipWithNext(fitCenteredInto_0(toList(closure$presenter.generatePoints()), window));
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        var closure$context_0 = closure$context;
        var p1 = element.component1()
        , p2 = element.component2();
        if (!(p1 != null ? p1.equals(Point$Companion_getInstance().none) : null) && !(p2 != null ? p2.equals(Point$Companion_getInstance().none) : null)) {
          closure$context_0.moveTo(p1.x, p1.y);
          closure$context_0.lineTo(p2.x, p2.y);
        }
      }
      closure$context.closePath();
      closure$context.stroke();
    };
  }
  function main$lambda(closure$paintCanvas) {
    return function (it) {
      closure$paintCanvas();
      return Unit;
    };
  }
  function main() {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('myCanvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    if ((tmp$_2 = (tmp$_1 = document.body) != null ? tmp$_1.style : null) != null) {
      tmp$_2.margin = '0';
      tmp$_2.overflowX = 'hidden';
      tmp$_2.overflowY = 'hidden';
    }
    applyTheme1(context, document);
    var presenter = new LSystemPresenter();
    var paintCanvas = main$paintCanvas(context, canvas, presenter);
    paintCanvas();
    initConfigToolbar(presenter, getCallableRef('paintCanvas', function () {
      return paintCanvas(), Unit;
    }));
    updateConfigToolbar(presenter);
    window.addEventListener('keypress', onKeyPress(presenter, context, getCallableRef('paintCanvas', function () {
      return paintCanvas(), Unit;
    })));
    window.addEventListener('resize', main$lambda(paintCanvas), false);
  }
  function onKeyPress$lambda(closure$presenter) {
    return function () {
      closure$presenter.switch_za3lpa$(1);
      return Unit;
    };
  }
  function onKeyPress$lambda_0(closure$presenter) {
    return function () {
      closure$presenter.switch_za3lpa$(-1);
      return Unit;
    };
  }
  function onKeyPress$lambda_1(closure$presenter) {
    return function () {
      closure$presenter.changeDepth_za3lpa$(1);
      return Unit;
    };
  }
  function onKeyPress$lambda_2(closure$presenter) {
    return function () {
      closure$presenter.changeDepth_za3lpa$(-1);
      return Unit;
    };
  }
  function onKeyPress$lambda_3() {
    toggleConfigToolbar(document);
    return Unit;
  }
  function onKeyPress$lambda_4(closure$context) {
    return function () {
      applyTheme1(closure$context, document);
      return Unit;
    };
  }
  function onKeyPress$lambda_5(closure$context) {
    return function () {
      applyTheme2(closure$context, document);
      return Unit;
    };
  }
  function onKeyPress$lambda_6(closure$mapping, closure$updateUI, closure$presenter) {
    return function (event) {
      if (Kotlin.isType(event, KeyboardEvent)) {
        var action = closure$mapping.get_11rb$(event.key);
        if (action != null) {
          action();
          closure$updateUI();
          updateConfigToolbar(closure$presenter);
        }
      }
      return Unit;
    };
  }
  function onKeyPress(presenter, context, updateUI) {
    var mapping = mapOf([to('n', onKeyPress$lambda(presenter)), to('N', onKeyPress$lambda_0(presenter)), to('d', onKeyPress$lambda_1(presenter)), to('D', onKeyPress$lambda_2(presenter)), to('t', onKeyPress$lambda_3), to('q', onKeyPress$lambda_4(context)), to('w', onKeyPress$lambda_5(context))]);
    return onKeyPress$lambda_6(mapping, updateUI, presenter);
  }
  function toggleConfigToolbar(document) {
    var tmp$;
    var element = Kotlin.isType(tmp$ = document.getElementById('config-toolbar'), HTMLDivElement) ? tmp$ : throwCCE();
    if (equals(element.style.display, 'none')) {
      element.style.display = '';
    }
     else {
      element.style.display = 'none';
    }
  }
  var mapCapacity = Kotlin.kotlin.collections.mapCapacity_za3lpa$;
  var coerceAtLeast = Kotlin.kotlin.ranges.coerceAtLeast_dqglrj$;
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_xf5xz2$;
  function initConfigToolbar$lambda(closure$presenter, closure$updateUI) {
    return function (f) {
      closure$presenter.lSystem.value.axiom = inputById('axiom').value;
      var tmp$ = closure$presenter.lSystem.value;
      var $receiver = split(inputById('rules').value, ['; ']);
      var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        destination.add_11rb$(split(item, [' => ']));
      }
      var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(destination, 10)), 16);
      var destination_0 = LinkedHashMap_init(capacity);
      var tmp$_1;
      tmp$_1 = destination.iterator();
      while (tmp$_1.hasNext()) {
        var element = tmp$_1.next();
        var pair = new Pair(toBoxedChar(element.get_za3lpa$(0).charCodeAt(0)), element.get_za3lpa$(1));
        destination_0.put_xwzc9p$(pair.first, pair.second);
      }
      tmp$.rules = destination_0;
      closure$presenter.lSystem.value.angle = toRadians(toDouble(inputById('angle').value));
      closure$updateUI();
      return Unit;
    };
  }
  function initConfigToolbar(presenter, updateUI) {
    inputById('apply').addEventListener('click', initConfigToolbar$lambda(presenter, updateUI));
  }
  function updateConfigToolbar$lambda(it) {
    var $receiver = unboxChar(it.key);
    return String.fromCharCode($receiver) + ' => ' + it.value;
  }
  function updateConfigToolbar(presenter) {
    inputById('axiom').value = presenter.lSystem.value.axiom;
    inputById('rules').value = joinToString(presenter.lSystem.value.rules.entries, '; ', void 0, void 0, void 0, void 0, updateConfigToolbar$lambda);
    inputById('angle').value = toDegrees(presenter.lSystem.value.angle).toString();
  }
  function inputById(id) {
    var tmp$;
    return Kotlin.isType(tmp$ = document.getElementById(id), HTMLInputElement) ? tmp$ : throwCCE();
  }
  function applyTheme1(context, document) {
    var tmp$, tmp$_0;
    context.fillStyle = '#ffffff';
    context.strokeStyle = '#000000';
    (tmp$_0 = (tmp$ = document.body) != null ? tmp$.style : null) != null ? (tmp$_0.background = '#ffffff') : null;
  }
  function applyTheme2(context, document) {
    var tmp$, tmp$_0;
    context.fillStyle = '#000000';
    context.strokeStyle = '#ffffff';
    (tmp$_0 = (tmp$ = document.body) != null ? tmp$.style : null) != null ? (tmp$_0.background = '#000000') : null;
  }
  function LSystemPresenter() {
    this.lSystems = listOf([new LSystemPresenter$ConfigurableLSystem(kochSnowflake), new LSystemPresenter$ConfigurableLSystem(quadraticType1Curve), new LSystemPresenter$ConfigurableLSystem(quadraticType2Curve), new LSystemPresenter$ConfigurableLSystem(hilbertCurve), new LSystemPresenter$ConfigurableLSystem(gosperCurve), new LSystemPresenter$ConfigurableLSystem(sierpinskiTriangle), new LSystemPresenter$ConfigurableLSystem(sierpinskiArrowheadCurve), new LSystemPresenter$ConfigurableLSystem(dragonCurve, 14), new LSystemPresenter$ConfigurableLSystem(fractalPlant)]);
    this.lSystem = first(this.lSystems);
  }
  LSystemPresenter.prototype.generatePoints = function () {
    return this.lSystem.value.generatePoints_za3lpa$(this.lSystem.depth);
  };
  LSystemPresenter.prototype.switch_za3lpa$ = function (direction) {
    var tmp$;
    var $receiver = this.lSystems;
    var indexOfFirst$result;
    indexOfFirst$break: do {
      var tmp$_0;
      var index = 0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        if (equals(item.value, this.lSystem.value)) {
          indexOfFirst$result = index;
          break indexOfFirst$break;
        }
        index = index + 1 | 0;
      }
      indexOfFirst$result = -1;
    }
     while (false);
    var i = indexOfFirst$result + direction | 0;
    if (i < 0)
      tmp$ = last(this.lSystems);
    else if (i >= this.lSystems.size)
      tmp$ = first(this.lSystems);
    else
      tmp$ = this.lSystems.get_za3lpa$(i);
    this.lSystem = tmp$;
  };
  LSystemPresenter.prototype.changeDepth_za3lpa$ = function (increment) {
    var tmp$;
    tmp$ = this.lSystem;
    tmp$.depth = tmp$.depth + increment | 0;
    if (this.lSystem.depth > this.lSystem.maxDepth) {
      this.lSystem.depth = this.lSystem.maxDepth;
    }
    if (this.lSystem.depth <= 0) {
      this.lSystem.depth = 0;
    }
  };
  function LSystemPresenter$ConfigurableLSystem(value, maxDepth, url) {
    if (maxDepth === void 0)
      maxDepth = 9;
    if (url === void 0)
      url = null;
    this.value = value;
    this.maxDepth = maxDepth;
    this.url = url;
    this.depth = 1;
  }
  LSystemPresenter$ConfigurableLSystem.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ConfigurableLSystem',
    interfaces: []
  };
  LSystemPresenter.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LSystemPresenter',
    interfaces: []
  };
  var kochSnowflake;
  var cesaroFractal;
  var cesaroFractal2;
  var quadraticType1Curve;
  var quadraticType2Curve;
  var hilbertCurve;
  var gosperCurve;
  var sierpinskiTriangle;
  var sierpinskiArrowheadCurve;
  var dragonCurve;
  var fractalPlant;
  var fractalPlant2;
  function LSystem(axiom, rules, angle, initialAngle, closedPath, stepLength) {
    if (initialAngle === void 0)
      initialAngle = 0.0;
    if (closedPath === void 0)
      closedPath = false;
    if (stepLength === void 0)
      stepLength = 10.0;
    this.axiom = axiom;
    this.rules = rules;
    this.angle = angle;
    this.initialAngle = initialAngle;
    this.closedPath = closedPath;
    this.stepLength = stepLength;
  }
  LSystem.prototype.generatePoints_za3lpa$ = function (depth) {
    if (depth === void 0)
      depth = 3;
    return this.toPoints_0(this.generateOutput_0(this.axiom, depth), this.stepLength);
  };
  function LSystem$generateOutput$lambda(this$LSystem) {
    return function (c) {
      var tmp$;
      return (tmp$ = this$LSystem.rules.get_11rb$(c)) != null ? tmp$ : String.fromCharCode(unboxChar(c));
    };
  }
  LSystem.prototype.generateOutput_0 = function (input, depth) {
    if (depth === 0)
      return input;
    var result = joinToString(asIterable(input), '', void 0, void 0, void 0, void 0, LSystem$generateOutput$lambda(this));
    return this.generateOutput_0(result, depth - 1 | 0);
  };
  var iterator = Kotlin.kotlin.text.iterator_gw00vp$;
  function LSystem$toPoints$lambda(this$LSystem_0, closure$stepLength_0, this$toPoints_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$LSystem$toPoints$lambda(this$LSystem_0, closure$stepLength_0, this$toPoints_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$LSystem$toPoints$lambda(this$LSystem_0, closure$stepLength_0, this$toPoints_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$this$LSystem = this$LSystem_0;
    this.local$closure$stepLength = closure$stepLength_0;
    this.local$this$toPoints = this$toPoints_0;
    this.local$startPoint = void 0;
    this.local$angle = void 0;
    this.local$p = void 0;
    this.local$stack = void 0;
    this.local$tmp$ = void 0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$LSystem$toPoints$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$LSystem$toPoints$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$LSystem$toPoints$lambda.prototype.constructor = Coroutine$LSystem$toPoints$lambda;
  Coroutine$LSystem$toPoints$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.local$startPoint = new Point(0.0, 0.0);
            this.state_0 = 2;
            this.result_0 = this.local$$receiver.yield_11rb$(this.local$startPoint, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 1:
            throw this.exception_0;
          case 2:
            this.local$angle = {v: this.local$this$LSystem.initialAngle};
            this.local$p = {v: this.local$startPoint};
            this.local$stack = ArrayList_init();
            this.local$tmp$ = iterator(this.local$this$toPoints);
            this.state_0 = 3;
            continue;
          case 3:
            if (!this.local$tmp$.hasNext()) {
              this.state_0 = 11;
              continue;
            }

            var element = unboxChar(this.local$tmp$.next());
            var closure$stepLength = this.local$closure$stepLength;
            var this$LSystem = this.local$this$LSystem;
            var tmp$;
            tmp$ = unboxChar(toBoxedChar(element));
            if (tmp$ === 70 || tmp$ === 71) {
              var tmp$_0 = this.local$p.v;
              var x = this.local$angle.v;
              var tmp$_1 = Math_0.cos(x) * closure$stepLength;
              var x_0 = this.local$angle.v;
              this.local$p.v = tmp$_0.shift_lu1900$(tmp$_1, Math_0.sin(x_0) * closure$stepLength);
              this.state_0 = 9;
              this.result_0 = this.local$$receiver.yield_11rb$(this.local$p.v, this);
              if (this.result_0 === COROUTINE_SUSPENDED)
                return COROUTINE_SUSPENDED;
              break;
            }
             else {
              if (tmp$ === 43) {
                this.local$angle.v += this$LSystem.angle;
                this.state_0 = 8;
                continue;
              }
               else {
                if (tmp$ === 45) {
                  this.local$angle.v -= this$LSystem.angle;
                  this.state_0 = 7;
                  continue;
                }
                 else {
                  if (tmp$ === 91) {
                    this.local$stack.add_wxm5ur$(0, new Pair(this.local$p.v, this.local$angle.v));
                    this.state_0 = 6;
                    continue;
                  }
                   else {
                    if (tmp$ === 93) {
                      var removed = this.local$stack.removeAt_za3lpa$(0);
                      this.local$p.v = removed.first;
                      this.local$angle.v = removed.second;
                      this.state_0 = 4;
                      this.result_0 = this.local$$receiver.yield_11rb$(Point$Companion_getInstance().none, this);
                      if (this.result_0 === COROUTINE_SUSPENDED)
                        return COROUTINE_SUSPENDED;
                      break;
                    }
                     else {
                      this.state_0 = 5;
                      continue;
                    }
                  }
                }
              }
            }

          case 4:
            this.state_0 = 5;
            continue;
          case 5:
            this.state_0 = 6;
            continue;
          case 6:
            this.state_0 = 7;
            continue;
          case 7:
            this.state_0 = 8;
            continue;
          case 8:
            this.state_0 = 10;
            continue;
          case 9:
            this.state_0 = 10;
            continue;
          case 10:
            this.state_0 = 3;
            continue;
          case 11:
            if (this.local$this$LSystem.closedPath) {
              this.state_0 = 12;
              this.result_0 = this.local$$receiver.yield_11rb$(this.local$startPoint, this);
              if (this.result_0 === COROUTINE_SUSPENDED)
                return COROUTINE_SUSPENDED;
              break;
            }
             else {
              this.state_0 = 13;
              continue;
            }

          case 12:
            return Unit;
          case 13:
            return Unit;
        }
      }
       catch (e) {
        if (this.state_0 === 1)
          throw e;
        else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  LSystem.prototype.toPoints_0 = function ($receiver, stepLength) {
    return buildSequence(LSystem$toPoints$lambda(this, stepLength, $receiver));
  };
  LSystem.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LSystem',
    interfaces: []
  };
  function toDegrees($receiver) {
    return $receiver / math.PI * 180;
  }
  function toRadians($receiver) {
    return $receiver / 180 * math.PI;
  }
  function toRadians_0($receiver) {
    return toRadians($receiver);
  }
  function Point(x, y) {
    Point$Companion_getInstance();
    this.x = x;
    this.y = y;
  }
  Point.prototype.rotate_14dthe$ = function (angle) {
    var cos = Math_0.cos(angle);
    var sin = Math_0.sin(angle);
    return new Point(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  };
  Point.prototype.shift_lu1900$ = function (x, y) {
    return new Point(this.x + x, this.y + y);
  };
  Point.prototype.scale_14dthe$ = function (value) {
    return new Point(this.x * value, this.y * value);
  };
  function Point$Companion() {
    Point$Companion_instance = this;
    this.none = new Point(kotlin_js_internal_DoubleCompanionObject.NaN, kotlin_js_internal_DoubleCompanionObject.NaN);
  }
  Point$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Point$Companion_instance = null;
  function Point$Companion_getInstance() {
    if (Point$Companion_instance === null) {
      new Point$Companion();
    }
    return Point$Companion_instance;
  }
  Point.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Point',
    interfaces: []
  };
  Point.prototype.component1 = function () {
    return this.x;
  };
  Point.prototype.component2 = function () {
    return this.y;
  };
  Point.prototype.copy_lu1900$ = function (x, y) {
    return new Point(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Point.prototype.toString = function () {
    return 'Point(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Point.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Point.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function scale($receiver, value) {
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.scale_14dthe$(value));
    }
    return destination;
  }
  function shift($receiver, x, y) {
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      destination.add_11rb$(item.shift_lu1900$(x, y));
    }
    return destination;
  }
  function shift$lambda(closure$x, closure$y) {
    return function (it) {
      return it.shift_lu1900$(closure$x, closure$y);
    };
  }
  function shift_0($receiver, x, y) {
    return map($receiver, shift$lambda(x, y));
  }
  var IllegalArgumentException_init = Kotlin.kotlin.IllegalArgumentException;
  function fitCenteredInto($receiver, x1, y1, x2, y2) {
    if (!(x1 < x2 && y1 < y2)) {
      var message = 'Failed requirement.';
      throw new IllegalArgumentException_init(message.toString());
    }
    var width = x2 - x1;
    var height = y2 - y1;
    var minBy$result;
    minBy$break: do {
      var iterator = $receiver.iterator();
      if (!iterator.hasNext()) {
        minBy$result = null;
        break minBy$break;
      }
      var minElem = iterator.next();
      var minValue = minElem.x;
      while (iterator.hasNext()) {
        var e = iterator.next();
        var v = e.x;
        if (Kotlin.compareTo(minValue, v) > 0) {
          minElem = e;
          minValue = v;
        }
      }
      minBy$result = minElem;
    }
     while (false);
    var tmp$ = ensureNotNull(minBy$result).x;
    var minBy$result_0;
    minBy$break: do {
      var iterator_0 = $receiver.iterator();
      if (!iterator_0.hasNext()) {
        minBy$result_0 = null;
        break minBy$break;
      }
      var minElem_0 = iterator_0.next();
      var minValue_0 = minElem_0.y;
      while (iterator_0.hasNext()) {
        var e_0 = iterator_0.next();
        var v_0 = e_0.y;
        if (Kotlin.compareTo(minValue_0, v_0) > 0) {
          minElem_0 = e_0;
          minValue_0 = v_0;
        }
      }
      minBy$result_0 = minElem_0;
    }
     while (false);
    var minPoint = new Point(tmp$, ensureNotNull(minBy$result_0).y);
    var maxBy$result;
    maxBy$break: do {
      var iterator_1 = $receiver.iterator();
      if (!iterator_1.hasNext()) {
        maxBy$result = null;
        break maxBy$break;
      }
      var maxElem = iterator_1.next();
      var maxValue = maxElem.x;
      while (iterator_1.hasNext()) {
        var e_1 = iterator_1.next();
        var v_1 = e_1.x;
        if (Kotlin.compareTo(maxValue, v_1) < 0) {
          maxElem = e_1;
          maxValue = v_1;
        }
      }
      maxBy$result = maxElem;
    }
     while (false);
    var tmp$_0 = ensureNotNull(maxBy$result).x;
    var maxBy$result_0;
    maxBy$break: do {
      var iterator_2 = $receiver.iterator();
      if (!iterator_2.hasNext()) {
        maxBy$result_0 = null;
        break maxBy$break;
      }
      var maxElem_0 = iterator_2.next();
      var maxValue_0 = maxElem_0.y;
      while (iterator_2.hasNext()) {
        var e_2 = iterator_2.next();
        var v_2 = e_2.y;
        if (Kotlin.compareTo(maxValue_0, v_2) < 0) {
          maxElem_0 = e_2;
          maxValue_0 = v_2;
        }
      }
      maxBy$result_0 = maxElem_0;
    }
     while (false);
    var maxPoint = new Point(tmp$_0, ensureNotNull(maxBy$result_0).y);
    var pointsWidth = maxPoint.x - minPoint.x;
    var pointsHeight = maxPoint.y - minPoint.y;
    var a = width / pointsWidth;
    var b = height / pointsHeight;
    var minScale = Math_0.min(a, b);
    return shift(scale($receiver, minScale), x1 - minPoint.x * minScale + (width - pointsWidth * minScale) / 2, y1 - minPoint.y * minScale + (height - pointsHeight * minScale) / 2);
  }
  function fitCenteredInto_0($receiver, window_0, marginPercent) {
    if (marginPercent === void 0)
      marginPercent = 0.1;
    var a = window_0.innerWidth * marginPercent;
    var b = window_0.innerHeight * marginPercent;
    var margin = Math_0.min(a, b);
    return fitCenteredInto($receiver, margin, margin, window_0.innerWidth - margin, window_0.innerHeight - margin);
  }
  function main_0() {
    init();
    animate();
  }
  var camera;
  function get_camera() {
    if (camera == null)
      return throwUPAE('camera');
    return camera;
  }
  function set_camera(camera_0) {
    camera = camera_0;
  }
  var scene;
  function get_scene() {
    if (scene == null)
      return throwUPAE('scene');
    return scene;
  }
  function set_scene(scene_0) {
    scene = scene_0;
  }
  var renderer;
  function get_renderer() {
    if (renderer == null)
      return throwUPAE('renderer');
    return renderer;
  }
  function set_renderer(renderer_0) {
    renderer = renderer_0;
  }
  var composer;
  function get_composer() {
    if (composer == null)
      return throwUPAE('composer');
    return composer;
  }
  function set_composer(composer_0) {
    composer = composer_0;
  }
  var windowHalfX;
  var windowHalfY;
  function material1$ObjectLiteral() {
  }
  material1$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function material1$lambda($receiver) {
    $receiver.color = 0;
    $receiver.linewidth = 5.0;
    $receiver.opacity = 1.0;
    $receiver.blending = THREE.AdditiveBlending;
    $receiver.transparent = false;
    return Unit;
  }
  var material1;
  function material2$ObjectLiteral() {
  }
  material2$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function material2$lambda($receiver) {
    $receiver.color = 16777215;
    $receiver.opacity = 1.0;
    $receiver.blending = THREE.AdditiveBlending;
    $receiver.transparent = false;
    return Unit;
  }
  var material2;
  var lineMaterial;
  function init$lambda$lambda(closure$child) {
    return function (f) {
      closure$child.focus();
      return Unit;
    };
  }
  function init$lambda($receiver) {
    $receiver.uniforms['resolution'].value.set(1.0 / window.innerWidth, 1.0 / window.innerHeight);
    return Unit;
  }
  function init$lambda_0($receiver) {
    $receiver.renderToScreen = true;
    return Unit;
  }
  function init$generateScene(closure$presenter) {
    return function () {
      clear(get_scene());
      var geometry = {v: new THREE$Geometry()};
      var tmp$;
      tmp$ = closure$presenter.generatePoints().iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (element === LSystem3d$Companion_getInstance().emptyVector) {
          get_scene().add(new THREE$Line(geometry.v, lineMaterial));
          geometry.v = new THREE$Geometry();
        }
         else {
          geometry.v.vertices.push(element);
        }
      }
      if (!(geometry.v.vertices.length === 0)) {
        get_scene().add(new THREE$Line(geometry.v, lineMaterial));
      }
      render();
    };
  }
  function init() {
    var tmp$;
    var container = Kotlin.isType(tmp$ = document.getElementById('content'), Node) ? tmp$ : throwCCE();
    set_camera(new THREE$PerspectiveCamera(33.0, window.innerWidth / window.innerHeight, 1.0, 10000.0));
    get_camera().position.set(0, 0, 400);
    set_scene(new THREE$Scene());
    var $receiver = new THREE$WebGLRenderer();
    var tmp$_0;
    $receiver.setPixelRatio(window.devicePixelRatio);
    $receiver.setSize(window.innerWidth, window.innerHeight);
    var child = Kotlin.isType(tmp$_0 = container.appendChild($receiver.domElement), HTMLElement) ? tmp$_0 : throwCCE();
    child.setAttribute('tabindex', '0');
    child.addEventListener('click', init$lambda$lambda(child));
    set_renderer($receiver);
    applyTheme2_0();
    var effectFXAA = applyDynamic(new THREE$ShaderPass(THREE.FXAAShader), init$lambda);
    var effectBloom = new THREE$BloomPass(1.3);
    var effectCopy = applyDynamic(new THREE$ShaderPass(THREE.CopyShader), init$lambda_0);
    set_composer(new THREE$EffectComposer(get_renderer()));
    get_composer().addPass(new THREE$RenderPass(get_scene(), get_camera()));
    get_composer().addPass(effectCopy);
    var presenter = new LSystem3dPresenter();
    var generateScene = init$generateScene(presenter);
    generateScene();
    var orbitControls = new THREE$OrbitControls(get_camera(), get_renderer().domElement);
    orbitControls.keyPanSpeed = 0.0;
    initConfigToolbar_0(presenter, getCallableRef('generateScene', function () {
      return generateScene(), Unit;
    }));
    updateConfigToolbar_0(presenter);
    window.addEventListener('resize', getCallableRef('onWindowResize', function (event) {
      return onWindowResize(event), Unit;
    }), false);
    window.addEventListener('keypress', onKeyPress_0(presenter, orbitControls, getCallableRef('generateScene', function () {
      return generateScene(), Unit;
    })));
  }
  function clear($receiver) {
    while ($receiver.children.length > 0) {
      var children = $receiver.children;
      $receiver.remove(children[0]);
    }
  }
  function onKeyPress$lambda_7(closure$presenter) {
    return function () {
      closure$presenter.switch_za3lpa$(1);
      return Unit;
    };
  }
  function onKeyPress$lambda_8(closure$presenter) {
    return function () {
      closure$presenter.switch_za3lpa$(-1);
      return Unit;
    };
  }
  function onKeyPress$lambda_9(closure$presenter) {
    return function () {
      closure$presenter.changeIterationCount_za3lpa$(1);
      return Unit;
    };
  }
  function onKeyPress$lambda_10(closure$presenter) {
    return function () {
      closure$presenter.changeIterationCount_za3lpa$(-1);
      return Unit;
    };
  }
  function onKeyPress$lambda_11(closure$presenter) {
    return function () {
      closure$presenter.changeAngle_14dthe$(toRadians_0(5));
      return Unit;
    };
  }
  function onKeyPress$lambda_12(closure$presenter) {
    return function () {
      closure$presenter.changeAngle_14dthe$(toRadians_0(-5));
      return Unit;
    };
  }
  function onKeyPress$lambda_13(closure$orbitControls) {
    return function () {
      closure$orbitControls.reset();
      return Unit;
    };
  }
  function onKeyPress$lambda_14() {
    applyTheme1_0();
    return Unit;
  }
  function onKeyPress$lambda_15() {
    applyTheme2_0();
    return Unit;
  }
  function onKeyPress$lambda_16(closure$presenter) {
    return function () {
      var tmp$, tmp$_0, tmp$_1;
      tmp$_0 = (tmp$ = closure$presenter.lSystem.url) != null ? tmp$ : '';
      return (tmp$_1 = window.open(tmp$_0)) != null ? (tmp$_1.focus(), Unit) : null;
    };
  }
  function onKeyPress$lambda_17(closure$mapping, closure$updateUI, closure$presenter) {
    return function (event) {
      if (Kotlin.isType(event, KeyboardEvent)) {
        if (equals(event.key, '`')) {
          toggleConfigToolbar(document);
        }
        if (!Kotlin.isType(event.target, HTMLInputElement)) {
          var action = closure$mapping.get_11rb$(event.key);
          if (action != null) {
            action();
            closure$updateUI();
            updateConfigToolbar_0(closure$presenter);
          }
        }
      }
      return Unit;
    };
  }
  function onKeyPress_0(presenter, orbitControls, updateUI) {
    var mapping = mapOf([to('n', onKeyPress$lambda_7(presenter)), to('N', onKeyPress$lambda_8(presenter)), to('i', onKeyPress$lambda_9(presenter)), to('I', onKeyPress$lambda_10(presenter)), to('a', onKeyPress$lambda_11(presenter)), to('A', onKeyPress$lambda_12(presenter)), to('c', onKeyPress$lambda_13(orbitControls)), to('q', onKeyPress$lambda_14), to('w', onKeyPress$lambda_15), to('u', onKeyPress$lambda_16(presenter))]);
    return onKeyPress$lambda_17(mapping, updateUI, presenter);
  }
  function initConfigToolbar$applyChanges(closure$presenter, closure$updateUI) {
    return function () {
      closure$presenter.lSystem.value.axiom = inputById('axiom').value;
      var tmp$ = closure$presenter.lSystem.value;
      var $receiver = split(inputById('rules').value, ['; ']);
      var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        destination.add_11rb$(split(item, [' => ']));
      }
      var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(destination, 10)), 16);
      var destination_0 = LinkedHashMap_init(capacity);
      var tmp$_1;
      tmp$_1 = destination.iterator();
      while (tmp$_1.hasNext()) {
        var element = tmp$_1.next();
        var pair = new Pair(toBoxedChar(element.get_za3lpa$(0).charCodeAt(0)), element.get_za3lpa$(1));
        destination_0.put_xwzc9p$(pair.first, pair.second);
      }
      tmp$.rules = destination_0;
      closure$presenter.lSystem.value.angle = toRadians(toDouble(inputById('angle').value));
      closure$presenter.lSystem.iterations = toInt(inputById('iterations').value);
      closure$updateUI();
    };
  }
  function initConfigToolbar$lambda$lambda(closure$applyChanges) {
    return function (f) {
      closure$applyChanges();
      return Unit;
    };
  }
  function initConfigToolbar_0(presenter, updateUI) {
    var applyChanges = initConfigToolbar$applyChanges(presenter, updateUI);
    var tmp$;
    tmp$ = listOf([inputById('axiom'), inputById('rules'), inputById('angle'), inputById('iterations')]).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      element.addEventListener('change', initConfigToolbar$lambda$lambda(applyChanges));
    }
  }
  function updateConfigToolbar$lambda_0(it) {
    var $receiver = unboxChar(it.key);
    return String.fromCharCode($receiver) + ' => ' + it.value;
  }
  function updateConfigToolbar_0(presenter) {
    inputById('title').value = presenter.lSystem.title;
    inputById('axiom').value = presenter.lSystem.value.axiom;
    inputById('rules').value = joinToString(presenter.lSystem.value.rules.entries, '; ', void 0, void 0, void 0, void 0, updateConfigToolbar$lambda_0);
    inputById('angle').value = toDegrees(presenter.lSystem.value.angle).toString();
    inputById('iterations').value = presenter.lSystem.iterations.toString();
  }
  function applyTheme1_0() {
    var tmp$, tmp$_0;
    lineMaterial = material1;
    get_scene().background = new THREE$Color(16777215);
    (tmp$_0 = (tmp$ = document.body) != null ? tmp$.style : null) != null ? (tmp$_0.background = '#ffffff') : null;
  }
  function applyTheme2_0() {
    var tmp$, tmp$_0;
    lineMaterial = material2;
    get_scene().background = new THREE$Color(0);
    (tmp$_0 = (tmp$ = document.body) != null ? tmp$.style : null) != null ? (tmp$_0.background = '#000000') : null;
  }
  function animate(d) {
    if (d === void 0)
      d = 0.0;
    window.requestAnimationFrame(getCallableRef('animate', function (d) {
      return animate(d), Unit;
    }));
    render();
  }
  function render() {
    get_composer().render();
  }
  function onWindowResize(event) {
    windowHalfX = window.innerWidth / 2.0;
    windowHalfY = window.innerHeight / 2.0;
    get_camera().aspect = window.innerWidth / window.innerHeight;
    get_camera().updateProjectionMatrix();
    get_renderer().setSize(window.innerWidth, window.innerHeight);
  }
  function fitCenteredInto_1($receiver, x1, y1, z1, x2, y2, z2) {
    if (!(x1 < x2 && y1 < y2 && z1 < z2)) {
      var message = 'Failed requirement.';
      throw new IllegalArgumentException_init(message.toString());
    }
    var width = x2 - x1;
    var height = y2 - y1;
    var depth = z2 - z1;
    var minBy$result;
    minBy$break: do {
      var iterator = $receiver.iterator();
      if (!iterator.hasNext()) {
        minBy$result = null;
        break minBy$break;
      }
      var minElem = iterator.next();
      var minValue = minElem.x;
      while (iterator.hasNext()) {
        var e = iterator.next();
        var v = e.x;
        if (Kotlin.compareTo(minValue, v) > 0) {
          minElem = e;
          minValue = v;
        }
      }
      minBy$result = minElem;
    }
     while (false);
    var tmp$ = ensureNotNull(minBy$result).x;
    var minBy$result_0;
    minBy$break: do {
      var iterator_0 = $receiver.iterator();
      if (!iterator_0.hasNext()) {
        minBy$result_0 = null;
        break minBy$break;
      }
      var minElem_0 = iterator_0.next();
      var minValue_0 = minElem_0.y;
      while (iterator_0.hasNext()) {
        var e_0 = iterator_0.next();
        var v_0 = e_0.y;
        if (Kotlin.compareTo(minValue_0, v_0) > 0) {
          minElem_0 = e_0;
          minValue_0 = v_0;
        }
      }
      minBy$result_0 = minElem_0;
    }
     while (false);
    var tmp$_0 = ensureNotNull(minBy$result_0).y;
    var minBy$result_1;
    minBy$break: do {
      var iterator_1 = $receiver.iterator();
      if (!iterator_1.hasNext()) {
        minBy$result_1 = null;
        break minBy$break;
      }
      var minElem_1 = iterator_1.next();
      var minValue_1 = minElem_1.z;
      while (iterator_1.hasNext()) {
        var e_1 = iterator_1.next();
        var v_1 = e_1.z;
        if (Kotlin.compareTo(minValue_1, v_1) > 0) {
          minElem_1 = e_1;
          minValue_1 = v_1;
        }
      }
      minBy$result_1 = minElem_1;
    }
     while (false);
    var minPoint = new THREE$Vector3(tmp$, tmp$_0, ensureNotNull(minBy$result_1).z);
    var maxBy$result;
    maxBy$break: do {
      var iterator_2 = $receiver.iterator();
      if (!iterator_2.hasNext()) {
        maxBy$result = null;
        break maxBy$break;
      }
      var maxElem = iterator_2.next();
      var maxValue = maxElem.x;
      while (iterator_2.hasNext()) {
        var e_2 = iterator_2.next();
        var v_2 = e_2.x;
        if (Kotlin.compareTo(maxValue, v_2) < 0) {
          maxElem = e_2;
          maxValue = v_2;
        }
      }
      maxBy$result = maxElem;
    }
     while (false);
    var tmp$_1 = ensureNotNull(maxBy$result).x;
    var maxBy$result_0;
    maxBy$break: do {
      var iterator_3 = $receiver.iterator();
      if (!iterator_3.hasNext()) {
        maxBy$result_0 = null;
        break maxBy$break;
      }
      var maxElem_0 = iterator_3.next();
      var maxValue_0 = maxElem_0.y;
      while (iterator_3.hasNext()) {
        var e_3 = iterator_3.next();
        var v_3 = e_3.y;
        if (Kotlin.compareTo(maxValue_0, v_3) < 0) {
          maxElem_0 = e_3;
          maxValue_0 = v_3;
        }
      }
      maxBy$result_0 = maxElem_0;
    }
     while (false);
    var tmp$_2 = ensureNotNull(maxBy$result_0).y;
    var maxBy$result_1;
    maxBy$break: do {
      var iterator_4 = $receiver.iterator();
      if (!iterator_4.hasNext()) {
        maxBy$result_1 = null;
        break maxBy$break;
      }
      var maxElem_1 = iterator_4.next();
      var maxValue_1 = maxElem_1.z;
      while (iterator_4.hasNext()) {
        var e_4 = iterator_4.next();
        var v_4 = e_4.z;
        if (Kotlin.compareTo(maxValue_1, v_4) < 0) {
          maxElem_1 = e_4;
          maxValue_1 = v_4;
        }
      }
      maxBy$result_1 = maxElem_1;
    }
     while (false);
    var maxPoint = new THREE$Vector3(tmp$_1, tmp$_2, ensureNotNull(maxBy$result_1).z);
    var pointsWidth = maxPoint.x - minPoint.x;
    var pointsHeight = maxPoint.y - minPoint.y;
    var pointsDepth = maxPoint.z - minPoint.z;
    var a = width / pointsWidth;
    var b = height / pointsHeight;
    var a_0 = Math_0.min(a, b);
    var b_0 = depth / pointsDepth;
    var minScale = Math_0.min(a_0, b_0);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_3;
    tmp$_3 = $receiver.iterator();
    while (tmp$_3.hasNext()) {
      var item = tmp$_3.next();
      var tmp$_4 = destination.add_11rb$;
      var transform$result;
      if (item === LSystem3d$Companion_getInstance().emptyVector) {
        transform$result = item;
      }
       else {
        item.multiplyScalar(minScale);
        item.set(item.x + x1 - minPoint.x * minScale + (width - pointsWidth * minScale) / 2, item.y + y1 - minPoint.y * minScale + (height - pointsHeight * minScale) / 2, item.z + z1 - minPoint.z * minScale + (depth - pointsDepth * minScale) / 2);
        transform$result = item;
      }
      tmp$_4.call(destination, transform$result);
    }
    return destination;
  }
  function LSystem3dPresenter() {
    this.lSystems_0 = listOf([new LSystem3dPresenter$ConfigurableLSystem(kochSnowflake_0, void 0, 'Koch snowflake', 'https://en.wikipedia.org/wiki/Koch_snowflake'), new LSystem3dPresenter$ConfigurableLSystem(cesaroFractal_0, void 0, 'Cesaro fractal', 'http://mathworld.wolfram.com/CesaroFractal.html'), new LSystem3dPresenter$ConfigurableLSystem(quadraticType2Curve_0, void 0, 'Quadratic type 2', 'https://en.wikipedia.org/wiki/Koch_snowflake#Variants_of_the_Koch_curve'), new LSystem3dPresenter$ConfigurableLSystem(hilbertCurve_0, void 0, 'Hilbert curve', 'https://en.wikipedia.org/wiki/Hilbert_curve'), new LSystem3dPresenter$ConfigurableLSystem(lindenmayerCurve, void 0, 'Lindenmayer curve'), new LSystem3dPresenter$ConfigurableLSystem(gosperCurve_0, void 0, 'Gosper curve', 'https://en.wikipedia.org/wiki/Gosper_curve'), new LSystem3dPresenter$ConfigurableLSystem(sierpinskiTriangle_0, void 0, 'Sierpinski triangle', 'https://en.wikipedia.org/wiki/Sierpinski_triangle'), new LSystem3dPresenter$ConfigurableLSystem(sierpinskiArrowheadCurve_0, void 0, 'Sierpinski arrow head triangle', 'https://en.wikipedia.org/wiki/Sierpi%C5%84ski_arrowhead_curve'), new LSystem3dPresenter$ConfigurableLSystem(dragonCurve_0, 14, 'Dragon curve', 'https://en.wikipedia.org/wiki/Dragon_curve'), new LSystem3dPresenter$ConfigurableLSystem(fractalPlant_0, void 0, 'Plant', 'https://en.wikipedia.org/wiki/L-system#Example_7:_Fractal_plant'), new LSystem3dPresenter$ConfigurableLSystem(kochCurve3d, void 0, 'Koch curve 3d', 'https://github.com/Hiestaa/3D-Lsystem/blob/master/lsystem/KochCurve3D.py')]);
    this.lSystem = first(this.lSystems_0);
    this.debugMode = false;
    this.debugStepSize_0 = 1;
  }
  LSystem3dPresenter.prototype.generatePoints = function () {
    var points = fitCenteredInto_1(toList(this.lSystem.value.generatePoints_za3lpa$(this.lSystem.iterations)), -100.0, -100.0, -100.0, 100.0, 100.0, 100.0);
    return this.debugMode ? take(points, this.debugStepSize_0) : points;
  };
  LSystem3dPresenter.prototype.switch_za3lpa$ = function (direction) {
    var tmp$;
    var $receiver = this.lSystems_0;
    var indexOfFirst$result;
    indexOfFirst$break: do {
      var tmp$_0;
      var index = 0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        if (equals(item.value, this.lSystem.value)) {
          indexOfFirst$result = index;
          break indexOfFirst$break;
        }
        index = index + 1 | 0;
      }
      indexOfFirst$result = -1;
    }
     while (false);
    var i = indexOfFirst$result + direction | 0;
    if (i < 0)
      tmp$ = last(this.lSystems_0);
    else if (i >= this.lSystems_0.size)
      tmp$ = first(this.lSystems_0);
    else
      tmp$ = this.lSystems_0.get_za3lpa$(i);
    this.lSystem = tmp$;
    this.debugMode = false;
    this.debugStepSize_0 = 0;
  };
  LSystem3dPresenter.prototype.changeIterationCount_za3lpa$ = function (increment) {
    var tmp$;
    tmp$ = this.lSystem;
    tmp$.iterations = tmp$.iterations + increment | 0;
    if (this.lSystem.iterations > this.lSystem.maxIterations) {
      this.lSystem.iterations = this.lSystem.maxIterations;
    }
    if (this.lSystem.iterations <= 0) {
      this.lSystem.iterations = 0;
    }
  };
  LSystem3dPresenter.prototype.increaseDebugStep = function () {
    if (this.debugMode) {
      this.debugStepSize_0 = this.debugStepSize_0 + 1 | 0;
    }
  };
  LSystem3dPresenter.prototype.decreaseDebugStep = function () {
    if (this.debugMode) {
      this.debugStepSize_0 = this.debugStepSize_0 - 1 | 0;
    }
  };
  LSystem3dPresenter.prototype.changeAngle_14dthe$ = function (value) {
    var $receiver = this.lSystem.value;
    $receiver.angle = toRadians(round(toDegrees($receiver.angle + value)));
    if ($receiver.angle < 0)
      $receiver.angle += 2 * math.PI;
    if ($receiver.angle > 2 * math.PI)
      $receiver.angle -= 2 * math.PI;
  };
  function LSystem3dPresenter$ConfigurableLSystem(value, maxIterations, title, url) {
    if (maxIterations === void 0)
      maxIterations = 9;
    if (title === void 0)
      title = '';
    if (url === void 0)
      url = null;
    this.value = value;
    this.maxIterations = maxIterations;
    this.title = title;
    this.url = url;
    this.iterations = 1;
  }
  LSystem3dPresenter$ConfigurableLSystem.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ConfigurableLSystem',
    interfaces: []
  };
  LSystem3dPresenter.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LSystem3dPresenter',
    interfaces: []
  };
  var kochSnowflake_0;
  var cesaroFractal_0;
  var quadraticType2Curve_0;
  var hilbertCurve_0;
  var lindenmayerCurve;
  var gosperCurve_0;
  var sierpinskiTriangle_0;
  var sierpinskiArrowheadCurve_0;
  var dragonCurve_0;
  var fractalPlant_0;
  var hilbertCurve3d;
  var kochCurve3d;
  function LSystem3d(axiom, rules, angle, closedPath, stepLength) {
    LSystem3d$Companion_getInstance();
    if (closedPath === void 0)
      closedPath = false;
    if (stepLength === void 0)
      stepLength = 10.0;
    this.axiom = axiom;
    this.rules = rules;
    this.angle = angle;
    this.closedPath = closedPath;
    this.stepLength = stepLength;
  }
  LSystem3d.prototype.generatePoints_za3lpa$ = function (iterations) {
    if (iterations === void 0)
      iterations = 3;
    return this.toPoints_0(this.applyRules_0(this.axiom, iterations), this.stepLength);
  };
  function LSystem3d$applyRules$lambda(this$LSystem3d) {
    return function (char) {
      var tmp$;
      return (tmp$ = this$LSystem3d.rules.get_11rb$(char)) != null ? tmp$ : String.fromCharCode(unboxChar(char));
    };
  }
  LSystem3d.prototype.applyRules_0 = function (input, iterations) {
    if (iterations === 0)
      return input;
    var result = joinToString(asIterable(input), '', void 0, void 0, void 0, void 0, LSystem3d$applyRules$lambda(this));
    return this.applyRules_0(result, iterations - 1 | 0);
  };
  function LSystem3d$toPoints$lambda(closure$stepLength_0, this$LSystem3d_0, this$toPoints_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$LSystem3d$toPoints$lambda(closure$stepLength_0, this$LSystem3d_0, this$toPoints_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$LSystem3d$toPoints$lambda(closure$stepLength_0, this$LSystem3d_0, this$toPoints_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$closure$stepLength = closure$stepLength_0;
    this.local$this$LSystem3d = this$LSystem3d_0;
    this.local$this$toPoints = this$toPoints_0;
    this.local$startPoint = void 0;
    this.local$angles = void 0;
    this.local$p = void 0;
    this.local$stack = void 0;
    this.local$tmp$ = void 0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$LSystem3d$toPoints$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$LSystem3d$toPoints$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$LSystem3d$toPoints$lambda.prototype.constructor = Coroutine$LSystem3d$toPoints$lambda;
  Coroutine$LSystem3d$toPoints$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.local$startPoint = new THREE$Vector3(0, 0, 0);
            this.state_0 = 2;
            this.result_0 = this.local$$receiver.yield_11rb$(this.local$startPoint.clone(), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 1:
            throw this.exception_0;
          case 2:
            this.local$angles = {v: new THREE$Vector3(0, 0, 0)};
            this.local$p = {v: this.local$startPoint.clone()};
            this.local$stack = [];
            this.local$tmp$ = iterator(this.local$this$toPoints);
            this.state_0 = 3;
            continue;
          case 3:
            if (!this.local$tmp$.hasNext()) {
              this.state_0 = 16;
              continue;
            }

            var element = unboxChar(this.local$tmp$.next());
            var closure$stepLength = this.local$closure$stepLength;
            var this$LSystem3d = this.local$this$LSystem3d;
            var tmp$;
            tmp$ = unboxChar(toBoxedChar(element));
            if (tmp$ === 70 || tmp$ === 71 || tmp$ === 72 || tmp$ === 73) {
              var v = new THREE$Vector3(0, closure$stepLength, 0);
              v.applyEuler(new THREE$Euler(this.local$angles.v.x, this.local$angles.v.y, this.local$angles.v.z, 'XYZ'));
              this.local$p.v.add(v);
              this.state_0 = 14;
              this.result_0 = this.local$$receiver.yield_11rb$(this.local$p.v.clone(), this);
              if (this.result_0 === COROUTINE_SUSPENDED)
                return COROUTINE_SUSPENDED;
              break;
            }
             else {
              if (tmp$ === 43) {
                this.local$angles.v.z = this.local$angles.v.z + this$LSystem3d.angle;
                this.state_0 = 13;
                continue;
              }
               else {
                if (tmp$ === 45) {
                  this.local$angles.v.z = this.local$angles.v.z - this$LSystem3d.angle;
                  this.state_0 = 12;
                  continue;
                }
                 else {
                  if (tmp$ === 60) {
                    this.local$angles.v.x = this.local$angles.v.x + this$LSystem3d.angle;
                    this.state_0 = 11;
                    continue;
                  }
                   else {
                    if (tmp$ === 62) {
                      this.local$angles.v.x = this.local$angles.v.x - this$LSystem3d.angle;
                      this.state_0 = 10;
                      continue;
                    }
                     else {
                      if (tmp$ === 124) {
                        this.local$angles.v.x = this.local$angles.v.x - this$LSystem3d.angle * 2;
                        this.state_0 = 9;
                        continue;
                      }
                       else {
                        if (tmp$ === 94) {
                          this.local$angles.v.y = this.local$angles.v.y + this$LSystem3d.angle;
                          this.state_0 = 8;
                          continue;
                        }
                         else {
                          if (tmp$ === 38) {
                            this.local$angles.v.y = this.local$angles.v.y - this$LSystem3d.angle;
                            this.state_0 = 7;
                            continue;
                          }
                           else {
                            if (tmp$ === 91) {
                              this.local$stack.push(new Pair(this.local$p.v.clone(), this.local$angles.v.clone()));
                              this.state_0 = 6;
                              continue;
                            }
                             else {
                              if (tmp$ === 93) {
                                var removed = this.local$stack.pop();
                                this.local$p.v = removed.first;
                                this.local$angles.v = removed.second;
                                this.state_0 = 4;
                                this.result_0 = this.local$$receiver.yield_11rb$(LSystem3d$Companion_getInstance().emptyVector, this);
                                if (this.result_0 === COROUTINE_SUSPENDED)
                                  return COROUTINE_SUSPENDED;
                                break;
                              }
                               else {
                                this.state_0 = 5;
                                continue;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

          case 4:
            this.state_0 = 5;
            continue;
          case 5:
            this.state_0 = 6;
            continue;
          case 6:
            this.state_0 = 7;
            continue;
          case 7:
            this.state_0 = 8;
            continue;
          case 8:
            this.state_0 = 9;
            continue;
          case 9:
            this.state_0 = 10;
            continue;
          case 10:
            this.state_0 = 11;
            continue;
          case 11:
            this.state_0 = 12;
            continue;
          case 12:
            this.state_0 = 13;
            continue;
          case 13:
            this.state_0 = 15;
            continue;
          case 14:
            this.state_0 = 15;
            continue;
          case 15:
            this.state_0 = 3;
            continue;
          case 16:
            if (this.local$this$LSystem3d.closedPath) {
              this.state_0 = 17;
              this.result_0 = this.local$$receiver.yield_11rb$(this.local$startPoint.clone(), this);
              if (this.result_0 === COROUTINE_SUSPENDED)
                return COROUTINE_SUSPENDED;
              break;
            }
             else {
              this.state_0 = 18;
              continue;
            }

          case 17:
            return Unit;
          case 18:
            return Unit;
        }
      }
       catch (e) {
        if (this.state_0 === 1)
          throw e;
        else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  LSystem3d.prototype.toPoints_0 = function ($receiver, stepLength) {
    return buildSequence(LSystem3d$toPoints$lambda(stepLength, this, $receiver));
  };
  function LSystem3d$Companion() {
    LSystem3d$Companion_instance = this;
    this.emptyVector = new THREE$Vector3(kotlin_js_internal_DoubleCompanionObject.NaN, kotlin_js_internal_DoubleCompanionObject.NaN, kotlin_js_internal_DoubleCompanionObject.NaN);
  }
  LSystem3d$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var LSystem3d$Companion_instance = null;
  function LSystem3d$Companion_getInstance() {
    if (LSystem3d$Companion_instance === null) {
      new LSystem3d$Companion();
    }
    return LSystem3d$Companion_instance;
  }
  LSystem3d.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LSystem3d',
    interfaces: []
  };
  function toXYZString($receiver) {
    return $receiver.x.toString() + ' ' + toString($receiver.y) + ' ' + toString($receiver.z);
  }
  var push = defineInlineFunction('kotlin-js-katas.threejs.push_dxn8qf$', function ($receiver, e) {
    return $receiver.push(e);
  });
  var pop = defineInlineFunction('kotlin-js-katas.threejs.pop_4b5429$', function ($receiver) {
    return $receiver.pop();
  });
  var get_length = defineInlineFunction('kotlin-js-katas.threejs.get_length_qjns17$', function ($receiver) {
    return $receiver.length;
  });
  function applyDynamic($receiver, f) {
    f($receiver);
    return $receiver;
  }
  var package$lsystem = _.lsystem || (_.lsystem = {});
  package$lsystem.drawSnowflake = drawSnowflake;
  package$lsystem.pairs_2p1efm$ = pairs;
  package$lsystem.main = main;
  package$lsystem.toggleConfigToolbar_5oryg$ = toggleConfigToolbar;
  package$lsystem.initConfigToolbar_5pwh65$ = initConfigToolbar;
  package$lsystem.updateConfigToolbar_ned8zk$ = updateConfigToolbar;
  package$lsystem.inputById_61zpoe$ = inputById;
  LSystemPresenter.ConfigurableLSystem = LSystemPresenter$ConfigurableLSystem;
  package$lsystem.LSystemPresenter = LSystemPresenter;
  Object.defineProperty(package$lsystem, 'kochSnowflake', {
    get: function () {
      return kochSnowflake;
    }
  });
  package$lsystem.LSystem = LSystem;
  package$lsystem.toDegrees_yrwdxr$ = toDegrees;
  package$lsystem.toRadians_yrwdxr$ = toRadians;
  package$lsystem.toRadians_s8ev3n$ = toRadians_0;
  Object.defineProperty(Point, 'Companion', {
    get: Point$Companion_getInstance
  });
  package$lsystem.Point = Point;
  package$lsystem.scale_8e0gd9$ = scale;
  package$lsystem.shift_a0yzpn$ = shift;
  package$lsystem.shift_egj5h7$ = shift_0;
  package$lsystem.fitCenteredInto_4n1rjb$ = fitCenteredInto;
  package$lsystem.fitCenteredInto_jwqckm$ = fitCenteredInto_0;
  var package$threejs = _.threejs || (_.threejs = {});
  package$threejs.main = main_0;
  Object.defineProperty(package$threejs, 'camera', {
    get: get_camera,
    set: set_camera
  });
  Object.defineProperty(package$threejs, 'scene', {
    get: get_scene,
    set: set_scene
  });
  Object.defineProperty(package$threejs, 'renderer', {
    get: get_renderer,
    set: set_renderer
  });
  Object.defineProperty(package$threejs, 'composer', {
    get: get_composer,
    set: set_composer
  });
  Object.defineProperty(package$threejs, 'windowHalfX', {
    get: function () {
      return windowHalfX;
    },
    set: function (value) {
      windowHalfX = value;
    }
  });
  Object.defineProperty(package$threejs, 'windowHalfY', {
    get: function () {
      return windowHalfY;
    },
    set: function (value) {
      windowHalfY = value;
    }
  });
  Object.defineProperty(package$threejs, 'material1', {
    get: function () {
      return material1;
    }
  });
  Object.defineProperty(package$threejs, 'material2', {
    get: function () {
      return material2;
    }
  });
  Object.defineProperty(package$threejs, 'lineMaterial', {
    get: function () {
      return lineMaterial;
    },
    set: function (value) {
      lineMaterial = value;
    }
  });
  $$importsForInline$$['kotlin-js-katas'] = _;
  package$threejs.init = init;
  LSystem3dPresenter.ConfigurableLSystem = LSystem3dPresenter$ConfigurableLSystem;
  package$threejs.LSystem3dPresenter = LSystem3dPresenter;
  Object.defineProperty(LSystem3d, 'Companion', {
    get: LSystem3d$Companion_getInstance
  });
  package$threejs.LSystem3d = LSystem3d;
  package$threejs.push_dxn8qf$ = push;
  package$threejs.pop_4b5429$ = pop;
  package$threejs.get_length_qjns17$ = get_length;
  package$threejs.applyDynamic_isrcn9$ = applyDynamic;
  kochSnowflake = new LSystem('F--F--F', mapOf_0(to(toBoxedChar(70), 'F+F--F+F')), math.PI / 3, void 0, true);
  cesaroFractal = new LSystem('F', mapOf_0(to(toBoxedChar(70), 'F+F-F-F+F')), toRadians_0(85));
  cesaroFractal2 = new LSystem('F', mapOf_0(to(toBoxedChar(70), 'F+F--F+F')), math.PI / 3);
  quadraticType1Curve = new LSystem('F', mapOf_0(to(toBoxedChar(70), 'F+F-F-F+F')), math.PI / 2);
  quadraticType2Curve = new LSystem('F', mapOf_0(to(toBoxedChar(70), 'F+F-F-FF+F+F-F')), math.PI / 2);
  hilbertCurve = new LSystem('A', mapOf([to(toBoxedChar(65), '-BF+AFA+FB-'), to(toBoxedChar(66), '+AF-BFB-FA+')]), math.PI / 2);
  gosperCurve = new LSystem('F', mapOf([to(toBoxedChar(70), 'F-G--G+F++FF+G-'), to(toBoxedChar(71), '+F-GG--G-F++F+G')]), toRadians_0(60));
  sierpinskiTriangle = new LSystem('F-G-G', mapOf([to(toBoxedChar(70), 'F-G+F+G-F'), to(toBoxedChar(71), 'GG')]), toRadians_0(120));
  sierpinskiArrowheadCurve = new LSystem('F', mapOf([to(toBoxedChar(70), 'G-F-G'), to(toBoxedChar(71), 'F+G+F')]), math.PI / 3, math.PI);
  dragonCurve = new LSystem('FX', mapOf([to(toBoxedChar(88), 'X+YF+'), to(toBoxedChar(89), '-FX-Y')]), math.PI / 2, 1.5 * math.PI);
  fractalPlant = new LSystem('X', mapOf([to(toBoxedChar(88), 'F[-X][X]F[-X]+FX'), to(toBoxedChar(70), 'FF')]), toRadians_0(25), -math.PI / 2);
  fractalPlant2 = new LSystem('F', mapOf_0(to(toBoxedChar(70), 'FF-[-F+F+F]+[+F-F-F]')), toRadians(22.5), -math.PI / 2);
  windowHalfX = window.innerWidth / 2.0;
  windowHalfY = window.innerHeight / 2.0;
  material1 = new THREE$LineBasicMaterial(applyDynamic(new material1$ObjectLiteral(), material1$lambda));
  material2 = new THREE$LineBasicMaterial(applyDynamic(new material2$ObjectLiteral(), material2$lambda));
  lineMaterial = material1;
  kochSnowflake_0 = new LSystem3d('F--F--F', mapOf_0(to(toBoxedChar(70), 'F+F--F+F')), math.PI / 3, true);
  cesaroFractal_0 = new LSystem3d('F', mapOf_0(to(toBoxedChar(70), 'F+F-F-F+F')), toRadians_0(85));
  quadraticType2Curve_0 = new LSystem3d('F', mapOf_0(to(toBoxedChar(70), 'F+F-F-FF+F+F-F')), math.PI / 2);
  hilbertCurve_0 = new LSystem3d('A', mapOf([to(toBoxedChar(65), '-BF+AFA+FB-'), to(toBoxedChar(66), '+AF-BFB-FA+')]), math.PI / 2);
  lindenmayerCurve = new LSystem3d('X', mapOf([to(toBoxedChar(88), 'XFYFX+F+YFXFY-F-XFYFX'), to(toBoxedChar(89), 'YFXFY-F-XFYFX+F+YFXFY')]), math.PI / 2);
  gosperCurve_0 = new LSystem3d('F', mapOf([to(toBoxedChar(70), 'F-G--G+F++FF+G-'), to(toBoxedChar(71), '+F-GG--G-F++F+G')]), toRadians_0(60));
  sierpinskiTriangle_0 = new LSystem3d('F-G-G', mapOf([to(toBoxedChar(70), 'F-G+F+G-F'), to(toBoxedChar(71), 'GG')]), toRadians_0(120));
  sierpinskiArrowheadCurve_0 = new LSystem3d('F', mapOf([to(toBoxedChar(70), 'G-F-G'), to(toBoxedChar(71), 'F+G+F')]), math.PI / 3);
  dragonCurve_0 = new LSystem3d('FX', mapOf([to(toBoxedChar(88), 'X+YF+'), to(toBoxedChar(89), '-FX-Y')]), math.PI / 2);
  fractalPlant_0 = new LSystem3d('X', mapOf([to(toBoxedChar(88), 'F[-X][X]F[-X]+FX'), to(toBoxedChar(70), 'FF')]), toRadians_0(25));
  hilbertCurve3d = new LSystem3d('X', mapOf_0(to(toBoxedChar(88), '^<XF^<XFX-F^>>XFX&F+>>XFX-F>X->')), math.PI / 2);
  kochCurve3d = new LSystem3d('A', mapOf([to(toBoxedChar(65), '[[[[F+F-F-F+F]G<G>G>G<G]H-H+H+H-H]I>I<I<I>I]'), to(toBoxedChar(70), 'F+F-F-F+F'), to(toBoxedChar(71), 'G<G>G>G<G'), to(toBoxedChar(72), 'H-H+H+H-H'), to(toBoxedChar(73), 'I>I<I<I>I')]), math.PI / 2);
  Kotlin.defineModule('kotlin-js-katas', _);
  return _;
}(typeof this['kotlin-js-katas'] === 'undefined' ? {} : this['kotlin-js-katas'], kotlin);
