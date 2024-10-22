function gizmoCheck() {
  gizmoManager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragStartObservable.add(
    () => {
      clickedgizmo = true;
      gizmoclickcheck = true;
    }
  );
  gizmoManager.gizmos.positionGizmo.xGizmo.dragBehavior.onDragEndObservable.add(
    () => {
      clickedgizmo = false;
    }
  );
  gizmoManager.gizmos.positionGizmo.yGizmo.dragBehavior.onDragStartObservable.add(
    () => {
      clickedgizmo = true;
      gizmoclickcheck = true;
    }
  );
  gizmoManager.gizmos.positionGizmo.yGizmo.dragBehavior.onDragEndObservable.add(
    () => {
      clickedgizmo = false;
    }
  );
  gizmoManager.gizmos.positionGizmo.zGizmo.dragBehavior.onDragStartObservable.add(
    () => {
      clickedgizmo = true;
      gizmoclickcheck = true;
    }
  );
  gizmoManager.gizmos.positionGizmo.zGizmo.dragBehavior.onDragEndObservable.add(
    () => {
      clickedgizmo = false;
    }
  );

  gizmoManager.gizmos.rotationGizmo.xGizmo.dragBehavior.onDragStartObservable.add(
    () => {
      clickedgizmo = true;
      gizmoclickcheck = true;
    }
  );
  gizmoManager.gizmos.rotationGizmo.xGizmo.dragBehavior.onDragEndObservable.add(
    () => {
      clickedgizmo = false;
    }
  );
  gizmoManager.gizmos.rotationGizmo.yGizmo.dragBehavior.onDragStartObservable.add(
    () => {
      clickedgizmo = true;
      gizmoclickcheck = true;
    }
  );
  gizmoManager.gizmos.rotationGizmo.yGizmo.dragBehavior.onDragEndObservable.add(
    () => {
      clickedgizmo = false;
    }
  );
  gizmoManager.gizmos.rotationGizmo.zGizmo.dragBehavior.onDragStartObservable.add(
    () => {
      clickedgizmo = true;
      gizmoclickcheck = true;
    }
  );
  gizmoManager.gizmos.rotationGizmo.zGizmo.dragBehavior.onDragEndObservable.add(
    () => {
      clickedgizmo = false;
    }
  );

  gizmoManager.gizmos.scaleGizmo.xGizmo.dragBehavior.onDragStartObservable.add(
    () => {
      clickedgizmo = true;
      gizmoclickcheck = true;
      isscale = true;
    }
  );
  gizmoManager.gizmos.scaleGizmo.xGizmo.dragBehavior.onDragEndObservable.add(
    () => {
      clickedgizmo = false;
      isscale = false;
      savescale();
    }
  );
  gizmoManager.gizmos.scaleGizmo.yGizmo.dragBehavior.onDragStartObservable.add(
    () => {
      clickedgizmo = true;
      gizmoclickcheck = true;
      isscale = true;
    }
  );
  gizmoManager.gizmos.scaleGizmo.yGizmo.dragBehavior.onDragEndObservable.add(
    () => {
      clickedgizmo = false;
      isscale = false;
      savescale();
    }
  );
  gizmoManager.gizmos.scaleGizmo.zGizmo.dragBehavior.onDragStartObservable.add(
    () => {
      clickedgizmo = true;
      gizmoclickcheck = true;
      isscale = true;
    }
  );
  gizmoManager.gizmos.scaleGizmo.zGizmo.dragBehavior.onDragEndObservable.add(
    () => {
      clickedgizmo = false;
      isscale = false;
      savescale();
    }
  );
  gizmoManager.gizmos.scaleGizmo.uniformScaleGizmo.dragBehavior.onDragStartObservable.add(
    () => {
      clickedgizmo = true;
      gizmoclickcheck = true;
      isscale = true;
    }
  );

  gizmoManager.gizmos.scaleGizmo.uniformScaleGizmo.dragBehavior.onDragEndObservable.add(
    () => {
      clickedgizmo = false;
      isscale = false;
      savescale();
    }
  );
}
