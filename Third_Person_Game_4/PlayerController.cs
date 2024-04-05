using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
   public float moveSpeed = 5f;
   private Animator animator;

   private void Start()
   {
       animator = GetComponent<Animator>();
   }

   // Update is called once per frame
   private void Update()
   {
       HandleMovement();
       HandleAttack();
   }

   private void HandleMovement()
   {
       float horizontalInput = Input.GetAxis("Horizontal");
       float verticalInput = Input.GetAxis("Vertical");

       float moveAmount = Mathf.Clamp01(Mathf.Abs(horizontalInput) + Mathf.Abs(verticalInput));

       var moveInput = new Vector3(horizontalInput, 0, verticalInput);

       // Move the character based on the moveInput vector
       transform.position += moveInput * moveSpeed * Time.deltaTime;

       // Only rotate the character if there is movement input
       if (moveInput != Vector3.zero)
       {
           transform.rotation = Quaternion.LookRotation(moveInput);
       }

       animator.SetFloat("moveAmount", moveAmount);
   }

   private void HandleAttack()
   {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            // Activate the attack animation
            animator.SetTrigger("AttackTrigger");
        }
   }

}
