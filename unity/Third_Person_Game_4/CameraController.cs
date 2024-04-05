using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using UnityEngine;

public class CameraController : MonoBehaviour
{
   [SerializeField] Transform target;
   [SerializeField] float offsetX = 0;
   [SerializeField] float offsetY = 2;
   [SerializeField] float offsetZ = -5;
   
   private void Update()
   {
        transform.position = target.position + new Vector3(offsetX, offsetY, offsetZ);
   }
}

